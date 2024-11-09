import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonText, IonToast, IonItem, IonLabel } from '@ionic/react';
import './Register.css';

const Register: React.FC = () => {
  // States to manage form inputs and toast visibility
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Form submission handler
  const handleRegister = async () => {
    if (!username || !password) {
      setToastMessage('Please fill in both fields');
      setShowToast(true);
      return;
    }

    try {
      // Assuming you have an API to register the user
      const response = await fetch('https://your-api-endpoint.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setToastMessage('Registration successful');
      } else {
        setToastMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      setToastMessage('An error occurred. Please try again later.');
    }
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Create Account</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Registration Form */}
        <div className="register-form">
          <IonItem>
            <IonLabel position="floating">Username</IonLabel>
            <IonInput
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
              placeholder="Enter your username"
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              placeholder="Enter your password"
            />
          </IonItem>

          <IonButton expand="full" onClick={handleRegister}>
            Register
          </IonButton>

          {/* Toast Message for errors/success */}
          <IonToast
            isOpen={showToast}
            message={toastMessage}
            duration={3000}
            onDidDismiss={() => setShowToast(false)}
            position="top"
          />
        </div>

        <IonText className="redirect-link">
          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Register;
