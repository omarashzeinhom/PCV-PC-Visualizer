import React, { useState } from 'react';
import { IonButton } from '@ionic/react';
import PCComponent from '../PCComponent/PCComponent';

interface Component {
  id: string;
  type: string;
  x: number;
  y: number;
}

const componentPositions: Record<string, { x: number; y: number }> = {
  cpu: { x: 50, y: 30 },
  gpu: { x: 50, y: 80 },
  ram: { x: 80, y: 30 },
  motherboard: { x: 40, y: 60 },
  cpuCooler: { x: 55, y: 20 },
  psu: { x: 30, y: 150 },
};

const PCBuilder: React.FC = () => {
  const [components, setComponents] = useState<Component[]>([]);

  const addComponent = (type: string) => {
    const position = componentPositions[type];
    if (position) {
      setComponents((prev) => [
        ...prev,
        { id: type + Date.now().toString(), type, x: position.x, y: position.y },
      ]);
    }
  };

  return (
    <div>
      <div>
        <IonButton onClick={() => addComponent('cpu')}>Add CPU</IonButton>
        <IonButton onClick={() => addComponent('gpu')}>Add GPU</IonButton>
        <IonButton onClick={() => addComponent('ram')}>Add RAM</IonButton>
        <IonButton onClick={() => addComponent('motherboard')}>Add Motherboard</IonButton>
        <IonButton onClick={() => addComponent('cpuCooler')}>Add CPU Cooler</IonButton>
        <IonButton onClick={() => addComponent('psu')}>Add PSU</IonButton>
      </div>

      <div style={{ position: 'relative', width: '300px', height: '200px', border: '1px solid black', marginTop: '20px' }}>
        {components.map((component) => (
          <PCComponent key={component.id} component={component} />
        ))}
      </div>
    </div>
  );
};

export default PCBuilder;
