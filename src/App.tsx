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
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab2 from './pages/Tab2';
import Legal from './pages/Legal';
import { ComponentProvider } from './context/ComponentContext'; // Adjust the path as needed
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import PCBuilder from './pages/PCbuilder';

setupIonicReact();

const App: React.FC = () => (
  <ComponentProvider>
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/pcbuilder">
            <PCBuilder />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/legal">
            <Legal  />
          </Route>
          <Route exact path="/">
            <Redirect to="/pcbuilder" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="PCBuilder" href="/pcbuilder">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>PC Builder</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Builds</IonLabel>
          </IonTabButton>
          <IonTabButton tab="legal" href="/legal">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Legal</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  </ComponentProvider>
);

export default App;
