import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar, IonToast, IonBackdrop, IonItem, IonLabel } from '@ionic/react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import ExploreContainer from '../../components/Explore/ExploreContainer';
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
          <ExploreContainer name="Your Builds" />
        ) : (
          <>
            {/* Use Link with IonItem for navigation */}
        
              <Link to="/login">
                Log in
              </Link>
         
              <Link to="/register">
              Register
              </Link>
      
            <IonText>to save your builds.</IonText>
          </>
        )}

        <IonText>By ANDGOEDU</IonText>

        {/* Toast Message */}
        <IonToast
          isOpen={showToast}
          message="You need to be logged in to save your builds"
          duration={3000}
          onDidDismiss={() => setShowToast(false)}
          position="middle"
        />
      </IonContent>
    </IonPage>
  );
};

export default SavedBuild;
