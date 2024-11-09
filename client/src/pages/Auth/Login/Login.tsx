import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonLabel, IonItem, IonToast, IonLoading, IonCard } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');  // Changed email to username
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + 'api/auth/login', {
        username,  // Use username instead of email
        password,
      });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token); // Adjust based on your API
        history.push('/pcbuilder');
      } else {
        setErrorMessage('Invalid login credentials');
        setShowToast(true);
      }
    } catch (error) {
      setErrorMessage('Error during login, please try again later');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="login-content">
        <hr/>
        <hr/>
        <hr/>
        <hr/>
      <IonCard>
      <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel>Username</IonLabel>
            <IonInput
              type="text"
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel>Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              required
            />
          </IonItem>

          <IonButton expand="full" type="submit" disabled={isLoading}>
            Login
          </IonButton>
        </form>

        <IonLoading isOpen={isLoading} message="Logging in..." />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={errorMessage}
          duration={2000}
          color="danger"
        />
      </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
