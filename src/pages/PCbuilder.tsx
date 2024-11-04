import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './PCBuilder.css';
import PCBuilder from '../components/PCBuilder/PCBuilder';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>2D PC Builder</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">2D PC Builder</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PCBuilder />
        <IonButton>
          Save Build
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
