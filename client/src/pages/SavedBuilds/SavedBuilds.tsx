import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar, IonToast, IonBackdrop } from '@ionic/react';
import ExploreContainer from '../../components/Explore/ExploreContainer';
import './SavedBuild.css';

const SavedBuild: React.FC = () => {
  // State to manage the visibility of the toast and backdrop
  const [showToast, setShowToast] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check localStorage or a global state/context if the user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set true if token exists, false otherwise
  }, []);

  // Show toast notification and block access if not logged in
  const handlePageAccess = () => {
    if (!isLoggedIn) {
      setShowToast(true);
    }
  };

  useEffect(() => {
    handlePageAccess(); // Check and show toast if user is not logged in
  }, [isLoggedIn]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Builds</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Block the content with a backdrop if the user is not logged in */}
        {!isLoggedIn && (
          <IonBackdrop
            visible={true}
            style={{
              zIndex: 10, // Place backdrop above all content
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          />
        )}
        
        {/* Main content */}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Builds</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Conditionally render content based on login status */}
        {isLoggedIn ? (
          <ExploreContainer name="Your Builds" />
        ) : (
          <IonText color="medium">Please log in to save your builds.</IonText>
        )}
        
        <IonText>By ANDGOEDU</IonText>

        {/* Toast Message */}
        <IonToast
          isOpen={showToast}
          message="You need to be logged in to save your builds"
          duration={3000}
          onDidDismiss={() => setShowToast(false)} // Hide toast after it disappears
          position="middle" // This will center the toast
        />
      </IonContent>
    </IonPage>
  );
};

export default SavedBuild;
