import React, { useState } from 'react';
import { IonButton, IonToast } from '@ionic/react';
import PCComponent from '../PCComponent/PCComponent';

interface Component {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number; // Added width for resizing
  height: number; // Added height for resizing
  imageSrc?: string;
  link?: string; // Optional link for product
  specs?: string; // Optional specs for product
}

// Demo components with initial positions, links, and specs
const demoComponents: Component[] = [
  {
    id: '1',
    type: 'case',
    x: 50,
    y: 50,
    width: 500, // Example width in pixels for the case
    height: 500, // Example height in pixels for the case
    imageSrc: 'https://dlcdnwebimgs.asus.com/gain/6E502B0B-FDBD-4147-A431-A98ACE2A32EE/w1000/h732',
    specs: 'Mid Tower Case, ATX Compatible',
    link: 'https://example.com/case' // Add the actual link here
  },
  {
    id: '2',
    type: 'cpu',
    x: 170,
    y: 70,
    width: 60, // Width in pixels for the CPU
    height: 60, // Height in pixels for the CPU
    imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREl1Eo0G8H1qNohHzLixixRxmE8qoCUIVHeQ&s',
    specs: 'AMD Ryzen 9 7900X, 12 Cores, 24 Threads',
    link: 'https://example.com/cpu' // Add the actual link here
  },
  {
    id: '3',
    type: 'gpu',
    x: 170,
    y: 200,
    width: 400, // Width in pixels for the GPU
    height: 250, // Height in pixels for the GPU
    imageSrc: 'https://dlcdnwebimgs.asus.com/gain/D82691F5-CD33-4C21-895A-EA327CD3F8A3/w1000/h732',
    specs: 'NVIDIA GeForce RTX 4080, 16GB GDDR6X',
    link: 'https://example.com/gpu' // Add the actual link here
  },
  {
    id: '4',
    type: 'ram',
    x: 260,
    y: 100,
    width: 20, // Width in pixels for the RAM
    height: 70, // Height in pixels for the RAM
    imageSrc: 'https://via.placeholder.com/20x70',
    specs: '16GB DDR4 RAM',
    link: 'https://example.com/ram' // Add the actual link here
  },
  {
    id: '5',
    type: 'motherboard',
    x: 60,
    y: 130,
    width: 400, // Width in pixels for the motherboard
    height: 300, // Height in pixels for the motherboard
    imageSrc: 'https://dlcdnwebimgs.asus.com/gain/18EA4132-C4D3-4317-8C5C-49E2E717E19D/w1000/h732',
    specs: 'ASUS X870 Motherboard, ATX',
    link: 'https://example.com/motherboard' // Add the actual link here
  },
  {
    id: '6',
    type: 'cpuCooler',
    x: 200,
    y: 50,
    width: 70, // Width in pixels for the CPU cooler
    height: 70, // Height in pixels for the CPU cooler
    imageSrc: 'https://via.placeholder.com/60x60',
    specs: 'Noctua NH-D15S',
    link: 'https://example.com/cpuCooler' // Add the actual link here
  },
  {
    id: '7',
    type: 'psu',
    x: 80,
    y: 250,
    width: 150, // Width in pixels for the PSU
    height: 150, // Height in pixels for the PSU
    imageSrc: 'https://dlcdnwebimgs.asus.com/gain/D97D3CD2-5BAE-4B84-A7AD-C5DDD23AF015/w1000/h732',
    specs: '750W 80 Plus Gold PSU',
    link: 'https://example.com/psu' // Add the actual link here
  },
];

const PCBuilder: React.FC = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [showToast, setShowToast] = useState(false); // State for toast notification

  const addComponent = (component: Component) => {
    const existingComponent = components.find(c => c.id === component.id);
    if (existingComponent) {
      // If component already exists, allow editing
      editComponent(existingComponent.id, { ...existingComponent });
    } else {
      setComponents((prev) => [...prev, component]);
    }
  };

  const editComponent = (id: string, updatedComponent: Component) => {
    setComponents((prev) =>
      prev.map((component) =>
        component.id === id ? { ...component, ...updatedComponent } : component
      )
    );
  };

  const handleDragEnd = (id: string, x: number, y: number) => {
    setComponents((prev) =>
      prev.map((component) =>
        component.id === id ? { ...component, x, y } : component
      )
    );
  };

  const exportSpecs = () => {
    if (components.length === 0) {
      setShowToast(true); // Show toast if no components
      return;
    }

    const specs = components.map(({ id, type, specs }) => ({
      id,
      type,
      specs,
    }));

    const blob = new Blob([JSON.stringify(specs, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'pc_components_specs.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up the URL object
  };

  return (
    <div>
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
          />
        ))}
      </div>

      <div>
        {demoComponents.map((component) => (
          <IonButton key={component.id} onClick={() => addComponent(component)}>
            Add {component.type.toUpperCase()}
          </IonButton>
        ))}
      </div>

      <IonButton onClick={exportSpecs} style={{ marginTop: '20px' }}>
        Export Specs
      </IonButton>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="No PC components added! Please add components before exporting."
        duration={2000}
      />
    </div>
  );
};

export default PCBuilder;
