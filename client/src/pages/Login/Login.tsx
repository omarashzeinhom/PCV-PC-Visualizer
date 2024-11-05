// src/pages/Login.tsx
import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonLabel, IonContent, IonPage } from '@ionic/react';
import AuthService from '../services/auth.service';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            await AuthService.login(username, password);
            // Redirect or perform other actions upon successful login
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <IonPage>
            <IonContent>
                <IonItem>
                    <IonLabel position="floating">Username</IonLabel>
                    <IonInput value={username} onIonChange={e => setUsername(e.detail.value!)} />
                </IonItem>
                <IonItem
