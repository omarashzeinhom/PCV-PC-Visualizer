import React from 'react';
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { buildOutline, saveOutline, documentTextOutline } from 'ionicons/icons';
import AppMenu from '../AppMenu/AppMenu';

const AppTabs: React.FC = () => {
  return (
    <>
      {/* Side Menu */}
      <AppMenu />

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
    </>
  );
};

export default AppTabs;
