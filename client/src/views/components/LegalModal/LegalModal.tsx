import React, { useState, useEffect } from 'react';
import { IonModal, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const LegalModal: React.FC = () => {
  const [showModal, setShowModal] = useState(true);
  const history = useHistory();

  useEffect(() => {
    // Check if the user has already accepted the terms
    const accepted = localStorage.getItem('legalAccepted');
    if (accepted) {
      setShowModal(false);  // Skip showing the modal if already accepted
    } else {
      setShowModal(true);  // Show the modal if terms are not accepted
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('legalAccepted', 'true');  // Store the acceptance in localStorage
    setShowModal(false);  // Close the modal
    history.push('/pcbuilder');  // Redirect to the main page
  };

  const handleReject = () => {
    // Handle the rejection by redirecting the user out of the app
    localStorage.setItem('legalAccepted', 'false');  // Store rejection in localStorage to prevent further access
    setShowModal(false);  // Close the modal
    history.push('/login');  // Redirect to the login or another route (e.g., login, registration, or exit screen)
  };

  return (
    <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Legal Terms</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonText>
          <p>Please read and accept our terms and conditions to proceed.</p>
        </IonText>
        <IonButton expand="full" onClick={handleAccept}>
          Accept
        </IonButton>
        <IonButton expand="full" onClick={handleReject}>
          Reject
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default LegalModal;
