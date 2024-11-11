import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { ComponentProvider } from './context/ComponentContext'; // Adjust the path as needed

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';
import { PCBuilder, SavedBuild, Legal, Register, Login } from "./views/pages";
import { AppHeader, AppMenu, AppTabs, LegalModal } from './views/components';

setupIonicReact();

const App: React.FC = () => {
  // Check if the user has accepted the terms in localStorage
  const hasAcceptedTerms = localStorage.getItem('legalAccepted') === 'true';

  return (
    <ComponentProvider>
      <IonApp>
        <IonReactRouter>
          <AppMenu />
          <AppHeader />

          <IonTabs>
            <IonRouterOutlet id="main-content">
              {/* Only show routes if terms are accepted */}
              {!hasAcceptedTerms ? (
                <Redirect to="/legal" />
              ) : (
                <>
                  <Route exact path="/pcbuilder">
                    <PCBuilder />
                  </Route>
                  <Route exact path="/savedbuild">
                    <SavedBuild />
                  </Route>
                  <Route exact path="/register">
                    <Register />
                  </Route>
                  <Route exact path="/login">
                    <Login />
                  </Route>
                </>
              )}

              <Route exact path="/legal">
                <Legal />
              </Route>

              <Route exact path="/">
                <Redirect to={hasAcceptedTerms ? "/pcbuilder" : "/legal"} />
              </Route>
            </IonRouterOutlet>

            <AppTabs />
          </IonTabs>

          {/* Conditionally render the LegalModal if terms are not accepted */}
          {!hasAcceptedTerms && <LegalModal />}
        </IonReactRouter>
      </IonApp>
    </ComponentProvider>
  );
};

export default App;
