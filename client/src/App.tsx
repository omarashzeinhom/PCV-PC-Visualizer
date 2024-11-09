import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { buildOutline, documentTextOutline, saveOutline } from 'ionicons/icons';

import { ComponentProvider } from './context/ComponentContext'; // Adjust the path as needed

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
//import '@ionic/react/css/padding.css';
//import '@ionic/react/css/float-elements.css';
//import '@ionic/react/css/text-alignment.css';
//import '@ionic/react/css/text-transformation.css';
//import '@ionic/react/css/flex-utils.css';
//import '@ionic/react/css/display.css';

/* Ionic Dark Mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { PCBuilder, SavedBuild, Legal, Register,Login } from "./pages/index";

setupIonicReact();

const App: React.FC = () => (
  <ComponentProvider>
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            {/* Define the routes for each page */}
            <Route exact path="/pcbuilder">
              <PCBuilder />
            </Route>
            <Route exact path="/savedbuild">
              <SavedBuild />
            </Route>
            <Route exact path="/legal">
              <Legal />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            {/* Redirect default route to /pcbuilder */}
            <Route exact path="/">
              <Redirect to="/pcbuilder" />
            </Route>
          </IonRouterOutlet>

          {/* Tab bar with navigation links */}
          <IonTabBar slot="bottom">
            <IonTabButton tab="PCBuilder" href="/pcbuilder">
              <IonIcon aria-hidden="true" icon={buildOutline} />
              <IonLabel>PC Builder</IonLabel>
            </IonTabButton>
            <IonTabButton tab="SavedBuild" href="/savedbuild">
              <IonIcon aria-hidden="true" icon={saveOutline} />
              <IonLabel>Builds</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Legal" href="/legal">
              <IonIcon aria-hidden="true" icon={documentTextOutline} />
              <IonLabel>Legal</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  </ComponentProvider>
);

export default App;
