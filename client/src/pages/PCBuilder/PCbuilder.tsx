import {IonContent, IonHeader, IonItemDivider, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './PCBuilder.css';
import  {PCBuilder,ToastInstructions }from '../../components/index';
import PCPartPickerParser from '../../components/ParsePCPP/ParsePCPP';

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
        <IonItemDivider/>
        <PCPartPickerParser/>
        <ToastInstructions />
        <IonText>By ANDGOEDU</IonText>

      </IonContent>

    </IonPage>
  );
};

export default Tab1;
