import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar, IonToast, IonBackdrop, IonItem, IonLabel } from '@ionic/react';
import './SavedBuild.css';

const SavedBuild: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Check if the user is logged in
  }, []);

  const handlePageAccess = () => {
    if (!isLoggedIn) {
      setShowToast(true);
    }
  };

  useEffect(() => {
    handlePageAccess();
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
              zIndex: 10,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          />
        )}

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Builds</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Conditionally render content based on login status */}
        {isLoggedIn ? (
          <>
            Your Builds
          </>
        ) : (
          <div>
            <IonText className="redirect-link">
              <p>
                <a href="/login">Login here</a>
              </p>
            </IonText>
            <hr />
            <IonText className="redirect-link">
              <p>
                <a href="/register">Register</a>
              </p>
            </IonText>
            <IonText>to save your builds.</IonText>
          </div>
        )}

        <IonText>By ANDGOEDU</IonText>


      </IonContent>
    </IonPage>
  );
};

export default SavedBuild;
