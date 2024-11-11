import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Legal.css';



const Legal: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Terms of Service</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Terms of Service</h2>
        <p><strong>Last Updated: 04/11/2024 </strong></p>

        <h3>1. Acceptance of Terms</h3>
        <p>
          By accessing or using **PCV PC Visualizer** (the "App"), you agree to comply with and be bound by these Terms of Service and our Privacy Policy. If you do not agree with these terms, you must refrain from using the App.
        </p>

        <h3>2. User-Generated Content</h3>
        <p>
          **PCV PC Visualizer** allows users to upload, store, and manage their own images and other content. You are solely responsible for the images, files, and any content you upload or store using the App.
        </p>
        <ul>
          <li><strong>Ownership of Content:</strong> You retain all rights to any content you upload to **PCV PC Visualizer**. However, by using the App, you grant the App a non-exclusive, royalty-free license to display and interact with your content for the purpose of providing the service.</li>
          <li><strong>Responsibility for Content:</strong> You acknowledge that you are fully responsible for ensuring that any content you upload does not infringe upon the intellectual property rights of others, including copyrights, trademarks, or other proprietary rights.</li>
        </ul>

        <h3>3. Prohibited Content</h3>
        <p>
          You are prohibited from uploading, storing, or sharing any content that:
        </p>
        <ul>
          <li><strong>Violates Copyright:</strong> Content that is copyrighted by others without permission or appropriate licenses.</li>
          <li><strong>Infringes Trademarks:</strong> Content that uses trademarks, logos, or brand names without authorization.</li>
          <li><strong>Illegal Content:</strong> Content that violates applicable laws or regulations.</li>
        </ul>

        <h3>4. User Responsibility</h3>
        <ul>
          <li><strong>Legal Compliance:</strong> You are responsible for ensuring that all content uploaded to **PCV PC Visualizer** complies with applicable intellectual property laws and does not infringe upon the rights of third parties. The App is not responsible for any disputes regarding the ownership or rights of the uploaded content.</li>
          <li><strong>Indemnification:</strong> You agree to indemnify, defend, and hold harmless **PCV PC Visualizer**, its developers, and its affiliates from any and all claims, liabilities, damages, and expenses (including legal fees) arising out of or related to your uploaded content, including any alleged infringement of third-party intellectual property rights or violation of any applicable laws.</li>
        </ul>

        <h3>5. PCV PC Visualizer's Right to Remove Content</h3>
        <p>
          While **PCV PC Visualizer** does not actively monitor user-uploaded content, it reserves the right to remove any content that is reported to violate these Terms of Service, including content that infringes intellectual property rights or violates the law. **PCV PC Visualizer** may also suspend or terminate your access to the service in case of repeated or serious violations.
        </p>

        <h3>6. Limitation of Liability</h3>
        <p>
          **PCV PC Visualizer** is provided as a tool for visualization and design purposes. The App is not responsible for any damages, losses, or legal claims resulting from the use of uploaded content, including any infringements of third-party rights.
        </p>

        <h3>7. Changes to Terms of Service</h3>
        <p>
          **PCV PC Visualizer** reserves the right to modify or update these Terms of Service at any time. Changes will be communicated to users via the App or through a direct notification. Continued use of the App after changes are made constitutes your acceptance of the updated Terms of Service.
        </p>

        <h3>8. Contact Information</h3>
        <p>If you have any questions or concerns about these Terms of Service, please contact us at [Your Contact Information].</p>

        <h2>User Agreement</h2>

        <h3>1. Content Ownership</h3>
        <p>You confirm that you either own the rights to or have obtained permission to use and upload any images or other content you store in **PCV PC Visualizer**.</p>

        <h3>2. Legal Rights</h3>
        <p>You confirm that the images and content you upload to **PCV PC Visualizer** do not violate any third-party intellectual property rights, including copyrights or trademarks.</p>

        <h3>3. Prohibited Content</h3>
        <p>You agree not to upload, store, or share any content that violates intellectual property rights, is illegal, or infringes upon the rights of others.</p>

        <h3>4. No Liability for Content</h3>
        <p>You agree that **PCV PC Visualizer** is not responsible for any legal issues, claims, or disputes arising from the content you upload. You agree to indemnify **PCV PC Visualizer** against any such claims or damages.</p>

        <h3>5. Right to Remove Content</h3>
        <p>You understand that **PCV PC Visualizer** reserves the right to remove any content that violates these terms, and may suspend or terminate your account in case of violations.</p>

        <h3>6. Termination of Access</h3>
        <p>**PCV PC Visualizer** may terminate your access to the service if you fail to comply with these terms.</p>

        <IonText>By ANDGOEDU</IonText>

      </IonContent>
    </IonPage>
  );
};

export default Legal;
