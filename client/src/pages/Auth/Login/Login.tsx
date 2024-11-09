import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonLabel, IonItem, IonToast, IonLoading } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Show loading spinner while waiting for API response
    setIsLoading(true);

    try {
      // Make a POST request to the login API
      const response = await axios.post('https://your-api-url.com/login', {
        email,
        password,
      });

      // Check if login was successful (this depends on your API response structure)
      if (response.data.success) {
        // Optionally store JWT token or user data in localStorage/sessionStorage
        localStorage.setItem('authToken', response.data.token); // Adjust based on your API

        // Redirect to the PC Builder page or wherever you want
        history.push('/pcbuilder');
      } else {
        setErrorMessage('Invalid login credentials');
        setShowToast(true);
      }
    } catch (error) {
      setErrorMessage('Error during login, please try again later');
      setShowToast(true);
    } finally {
      setIsLoading(false); // Hide loading spinner after the request
    }
  };

  return (
    <IonPage>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel>Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
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

        {/* Loading Spinner */}
        <IonLoading isOpen={isLoading} message="Logging in..." />

        {/* Error Toast */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={errorMessage}
          duration={2000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
