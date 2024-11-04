import React, { useState } from 'react';
import { IonButton } from '@ionic/react';
import PCComponent from '../PCComponent/PCComponent';

interface Component {
  id: string;
  type: string;
  x: number;
  y: number;
  imageSrc?: string;
}

// Demo components with initial positions
const demoComponents: Component[] = [
  { id: '1', type: 'case', x: 0, y: 0, imageSrc: 'https://dlcdnwebimgs.asus.com/gain/6E502B0B-FDBD-4147-A431-A98ACE2A32EE/w1000/h732' },
  { id: '2', type: 'cpu', x: 150, y: 100, imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREl1Eo0G8H1qNohHzLixixRxmE8qoCUIVHeQ&s' },
  { id: '3', type: 'gpu', x: 80, y: 180, imageSrc: 'https://dlcdnwebimgs.asus.com/gain/D82691F5-CD33-4C21-895A-EA327CD3F8A3/w1000/h732' },
  { id: '4', type: 'ram', x: 200, y: 70, imageSrc: 'https://via.placeholder.com/20x60' },
  { id: '5', type: 'motherboard', x: 50, y: 50, imageSrc: 'https://dlcdnwebimgs.asus.com/gain/18EA4132-C4D3-4317-8C5C-49E2E717E19D/w1000/h732' },
  { id: '6', type: 'cpuCooler', x: 150, y: 30, imageSrc: 'https://via.placeholder.com/60x60' },
  { id: '7', type: 'psu', x: 30, y: 250, imageSrc: 'https://dlcdnwebimgs.asus.com/gain/D97D3CD2-5BAE-4B84-A7AD-C5DDD23AF015/w1000/h732' },
];

const PCBuilder: React.FC = () => {
  const [components, setComponents] = useState<Component[]>([]);

  const addComponent = (component: Component) => {
    setComponents((prev) => [...prev, component]);
  };

  const handleDragEnd = (id: string, x: number, y: number) => {
    setComponents((prev) =>
      prev.map((component) =>
        component.id === id ? { ...component, x, y } : component
      )
    );
  };

  return (
    <div>
      <div>
        {demoComponents.map((component) => (
          <IonButton key={component.id} onClick={() => addComponent(component)}>
            Add {component.type.toUpperCase()}
          </IonButton>
        ))}
      </div>

      <div
        style={{
          position: 'relative',
          width: '400px',
          height: '300px',
          border: '1px solid black',
          marginTop: '20px',
          overflow: 'hidden',
        }}
      >
        {components.map((component) => (
          <PCComponent
            key={component.id}
            component={component}
            onDragEnd={handleDragEnd}
          />
        ))}
      </div>
    </div>
  );
};

export default PCBuilder;
