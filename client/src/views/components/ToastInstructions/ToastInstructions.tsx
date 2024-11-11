import React, { useEffect, useState } from 'react';
import { IonToast } from '@ionic/react';

const ToastInstructions: React.FC = () => {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    setShowToast(true);
  }, []);

  return (
    <IonToast
      isOpen={showToast}
      onDidDismiss={() => setShowToast(false)}
      message="Add a component and click to drag it. Right-click to resize, then right-click again to finalize."
      duration={5000}
      buttons={[
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            setShowToast(false);
          },
        },
      ]}
    />
  );
};

export default ToastInstructions;
