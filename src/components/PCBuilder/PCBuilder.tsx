import React, { useState } from 'react';
import { IonButton } from '@ionic/react';
import PCComponent from '../PCComponent/PCComponent';

interface Component {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number; // Added dynamic width
  height: number; // Added dynamic height
  imageSrc?: string;
  link?: string; // URL for the component
}

// Demo components with initial positions and links
const demoComponents: Component[] = [
  { 
    id: '1', 
    type: 'case', 
    x: 50, 
    y: 50, 
    width: 800, // Set default width
    height: 600, // Set default height
    imageSrc: 'https://dlcdnwebimgs.asus.com/gain/6E502B0B-FDBD-4147-A431-A98ACE2A32EE/w1000/h732',
    link: 'https://example.com/case' 
  },
  { 
    id: '2', 
    type: 'cpu', 
    x: 170, 
    y: 70, 
    width: 60, 
    height: 60, 
    imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREl1Eo0G8H1qNohHzLixixRxmE8qoCUIVHeQ&s',
    link: 'https://example.com/cpu' 
  },
  { 
    id: '3', 
    type: 'gpu', 
    x: 170, 
    y: 200, 
    width: 400, 
    height: 250, 
    imageSrc: 'https://dlcdnwebimgs.asus.com/gain/D82691F5-CD33-4C21-895A-EA327CD3F8A3/w1000/h732',
    link: 'https://example.com/gpu' 
  },
  { 
    id: '4', 
    type: 'ram', 
    x: 260, 
    y: 100, 
    width: 20, 
    height: 70, 
    imageSrc: 'https://via.placeholder.com/20x60',
    link: 'https://example.com/ram' 
  },
  { 
    id: '5', 
    type: 'motherboard', 
    x: 60, 
    y: 130, 
    width: 400, 
    height: 300, 
    imageSrc: 'https://dlcdnwebimgs.asus.com/gain/18EA4132-C4D3-4317-8C5C-49E2E717E19D/w1000/h732',
    link: 'https://example.com/motherboard' 
  },
  { 
    id: '6', 
    type: 'cpuCooler', 
    x: 200, 
    y: 50, 
    width: 70, 
    height: 70, 
    imageSrc: 'https://via.placeholder.com/60x60',
    link: 'https://example.com/cpucooler' 
  },
  { 
    id: '7', 
    type: 'psu', 
    x: 80, 
    y: 250, 
    width: 150, 
    height: 150, 
    imageSrc: 'https://dlcdnwebimgs.asus.com/gain/D97D3CD2-5BAE-4B84-A7AD-C5DDD23AF015/w1000/h732',
    link: 'https://example.com/psu' 
  },
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

  const handleResize = (id: string, width: number, height: number) => {
    setComponents((prev) =>
      prev.map((component) =>
        component.id === id ? { ...component, width, height } : component
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
          width: '800px', // Increased width
          height: '600px', // Increased height
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
            onResize={handleResize}
          />
        ))}
      </div>
    </div>
  );
};

export default PCBuilder;
