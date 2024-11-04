import React, { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonText, IonToast } from '@ionic/react';
import PCComponent from '../PCComponent/PCComponent';
import './PCBuilder.css'

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
    id: '3',
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
    id: '6',
    type: 'cpuCooler',
    x: 200,
    y: 50,
    width: 70, // Width in pixels for the CPU cooler
    height: 70, // Height in pixels for the CPU cooler
    imageSrc: 'https://a.storyblok.com/f/281110/1500x1500/b7e4b15986/hyper-622-halo-white-01-gallery-03.png/m/960x0/smart',
    specs: 'Hyper 622 Halo White',
    link: 'https://www.coolermaster.com/en-global/products/hyper-622-halo-white/' // Add the actual link here
  },
  {
    id: '7',
    type: 'psu',
    x: 80,
    y: 250,
    width: 150, // Width in pixels for the PSU
    height: 150, // Height in pixels for the PSU
    imageSrc: 'https://dlcdnwebimgs.asus.com/gain/D97D3CD2-5BAE-4B84-A7AD-C5DDD23AF015/w1000/h732',
    specs: '1000W Aura ROG Strix White PSU',
    link: 'https://example.com/psu' // Add the actual link here
  },
  {
    id: '8',
    type: 'casefans',
    x: 80,
    y: 250,
    width: 150, // Width in pixels for the PSU
    height: 150, // Height in pixels for the PSU
    imageSrc: 'https://lian-li.com/wp-content/uploads/2020/11/UNI-FAN-white-rgbx1-front.jpg',
    specs: '120mm LIAN LI UNI Fan',
    link: 'https://example.com/psu' // Add the actual link here
  },
];

const PCBuilder: React.FC = () => {
  const [components, setComponents] = useState<Component[]>(() => {
    const savedComponents = localStorage.getItem('pcComponents');
    return savedComponents ? JSON.parse(savedComponents) : [];
  });

  const [showToast, setShowToast] = useState(false);
  const [imageInputs, setImageInputs] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    localStorage.setItem('pcComponents', JSON.stringify(components));
  }, [components]);

  const addComponent = (component: Component) => {
    const imageSrc = imageInputs[component.id] || component.imageSrc;
    const newComponent: Component = { ...component, imageSrc };

    const existingComponent = components.find(c => c.id === component.id);
    if (existingComponent) {
      editComponent(existingComponent.id, newComponent);
    } else {
      setComponents((prev) => [...prev, newComponent]);
    }
    setImageInputs((prev) => ({ ...prev, [component.id]: '' }));
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
      setShowToast(true);
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
    URL.revokeObjectURL(url);
  };


  return (
    <div>
      <div
        id="screenshot-area"
        style={{
          position: 'relative',
          width: '100%',
          height: '600px',
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
      <IonGrid style={{ marginTop: '20px' }}>
        <IonText color="warning" style={{ fontSize: '12px' }}>
          Note: The PC specs are not checked for compatibility; this design is purely for visual representation using images.
        </IonText>
        <hr />
        <IonText color="primary" style={{ fontSize: '12px' }}>
          Note: Add Side View of Each Component to get the best results
        </IonText>
        {demoComponents.map((component) => (
          <IonRow key={component.id} style={{ marginBottom: '10px', alignItems: 'center' }}>
            <IonCol size="auto">
              <IonItem>
                <IonLabel position="floating"></IonLabel>
                <IonInput
                  fill="solid"
                  labelPlacement="floating"
                  label={component?.type?.toUpperCase()}
                  value={imageInputs[component.id] || ''}
                  onIonChange={(e) => setImageInputs({ ...imageInputs, [component.id]: e.detail.value! })}
                  style={{ padding: '10px', marginRight: '10px', width: '100%' }}
                  placeholder={`Enter image link`}
                />
              </IonItem>
            </IonCol>
            <IonCol size="auto">

              <IonButton onClick={() => addComponent(component)}>
                Add {component.type.toUpperCase()}
              </IonButton>
            </IonCol>
            <IonCol>
              <IonCard style={{ margin: 0, padding: '5px', textAlign: 'center' }}>
                <IonCardContent>
                  {component.specs && (
                    <IonText style={{ fontSize: '12px' }}>{component.specs}</IonText>
                  )}
                  {component.link && (
                    <IonItem lines="none" style={{ padding: 0 }}>
                      <IonLabel>
                        <IonText color="primary" style={{ fontSize: '12px' }}>
                          <a href={component.link} target="_blank" rel="noopener noreferrer">
                            View Product
                          </a>
                        </IonText>
                      </IonLabel>
                    </IonItem>
                  )}

                </IonCardContent>
              </IonCard>
            </IonCol>

          </IonRow>
        ))}

      </IonGrid>

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