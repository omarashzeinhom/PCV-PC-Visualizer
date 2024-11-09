import React from 'react';
import { IonMenu, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonAvatar, IonLabel } from '@ionic/react';
import { personCircleOutline, logInOutline, logOutOutline, personAddOutline } from 'ionicons/icons';

const AppMenu: React.FC = () => {
  const isLoggedIn = false; // Change this as per your auth state management

  const avatarSrc = isLoggedIn ? "https://placekitten.com/150/150" : null;

  return (
    <IonMenu side="start" contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          {avatarSrc && (
            <IonAvatar style={{ marginBottom: '20px' }}>
              <img src={avatarSrc} alt="Avatar" />
            </IonAvatar>
          )}
          <IonLabel style={{ display: 'block', marginBottom: '20px' }}>
            {isLoggedIn ? 'Username' : 'Guest'}
          </IonLabel>

          {isLoggedIn ? (
            <>
              <IonButton href="/profile" expand="full" fill="clear">
                <IonIcon slot="start" icon={personCircleOutline} />
                Profile
              </IonButton>
              <IonButton href="/logout" expand="full" fill="clear">
                <IonIcon slot="start" icon={logOutOutline} />
                Logout
              </IonButton>
            </>
          ) : (
            <>
              <IonButton href="/login" expand="full" fill="clear">
                <IonIcon slot="start" icon={logInOutline} />
                Login
              </IonButton>
              <IonButton href="/register" expand="full" fill="clear">
                <IonIcon slot="start" icon={personAddOutline} />
                Register
              </IonButton>
            </>
          )}
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default AppMenu;
