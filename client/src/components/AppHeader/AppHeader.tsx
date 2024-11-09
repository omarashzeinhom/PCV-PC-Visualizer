import { IonMenuButton, IonToolbar, IonButtons, IonHeader, IonTitle } from '@ionic/react';

const AppHeader: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        {/* Menu button to open the side menu */}
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>PCV</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default AppHeader;
