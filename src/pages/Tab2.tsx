import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Builds</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Builds</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Coming Soon" />
        <IonText>By ANDGOEDU</IonText>

      </IonContent>
      
    </IonPage>
  );
};

export default Tab2;
