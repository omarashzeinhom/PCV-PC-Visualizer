import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Legal.css';

const Legal: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Legal Disclaimer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Legal Disclaimer</h2>
        <p><strong>Last Updated: 04/11/2024 </strong></p>

        <h3>Disclaimer of Liability</h3>
        <p>
          The information and services provided by "PC Visualizer" (the “App”) are intended for informational purposes only.
          While we strive to provide accurate and up-to-date content, we make no representations or warranties regarding
          the completeness, accuracy, or reliability of any information related to brands, products, or services referenced
          within the App.
        </p>

        <h3>Image Ownership</h3>
        <p>
          PC Visualizer does not own or claim any rights to images, logos, or trademarks associated with brands featured
          in this App. All images and trademarks are the property of their respective owners. Any use of images or
          trademarks from third-party brands is purely for identification and illustrative purposes.
        </p>

        <h3>Legal Responsibility</h3>
        <p>
          Users of the App acknowledge and agree that they are solely responsible for their actions related to the use of
          images, trademarks, or other content derived from the App. The owners of the brands and images have the right to
          pursue legal action against individuals or businesses that use their content without proper authorization.
        </p>

        <p>
        PC Visualizer shall not be held liable for any claims, losses, damages, or legal disputes arising from the
          unauthorized use of images or trademarks by users. We encourage users to obtain proper licensing or permission
          from the appropriate brand owners before using any images or content.
        </p>

        <h3>No Screenshots or Image Storage</h3>
        <p>
          To prevent any potential copyright infringement, our App does not save parts or take screenshots of any components,
          ensuring compliance with cross-origin requests and copyright laws.
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Legal;
