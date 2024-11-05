import React, { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCol, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonText, IonToast } from '@ionic/react';
import PCComponent from '../PCComponent/PCComponent';
import './PCBuilder.css';
import { demoComponents, Component } from "../../constants/demoproducts";

const PCBuilder: React.FC = () => {
  const [components, setComponents] = useState<Component[]>(() => {
    const savedComponents = localStorage.getItem('pcComponents');
    return savedComponents ? JSON.parse(savedComponents) : [];
  });

  const [showToast, setShowToast] = useState(false);
  const [imageInputs, setImageInputs] = useState<{ [key: string]: string }>({});
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');


  useEffect(() => {
    localStorage.setItem('pcComponents', JSON.stringify(components));
  }, [components]);

  const debounce = (func: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

  useEffect(() => {
    const updateDevice = debounce(() => {
      setDevice(window.innerWidth < 768 ? 'mobile' : 'desktop');
  }, 200);
    updateDevice();
    window.addEventListener('resize', updateDevice);
    return () => window.removeEventListener('resize', updateDevice);
  }, []);


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

  const handleDragEnd = (id: string, x: number, y: number, width: number, height: number) => {
    setComponents((prev) =>
      prev.map((component) =>
        component.id === id ? { ...component, x, y, width, height } : component
      )
    );
  };

  const handleResizeEnd = (id: string, width: number, height: number) => {
    setComponents((prev) =>
      prev.map((component) =>
        component.id === id ? { ...component, width, height } : component
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

  const resetCache = () => {
    localStorage.clear();
    setComponents([]);
    console.log('Cache has been reset.');
    alert('Build Has Been Cleared')
};

  
  return (
    <>
      <div
        id="screenshot-area"
        style={{
          height: '90vh',
          position: 'relative',
        }}
      >
        {components.map((component) => (
          <PCComponent
            key={component.id}
            
            component={{
              ...component,
              width: component.width * (device === 'mobile' ? 0.8 : 1),
              height: component.height * (device === 'mobile' ? 0.8 : 1)
            }}
            onDragEnd={handleDragEnd}
            onResizeEnd={handleResizeEnd} // Add the resize handler
          />
        ))}
      </div>
      <IonGrid style={{ marginTop: '20px' }}>
        <IonCard>
          <IonCardHeader>
            <IonText color="warning" style={{ fontSize: '12px' }}>
              Note: The PC specs are not checked for compatibility; this design is purely for visual representation using images.
            </IonText>
          </IonCardHeader>
          <IonCardContent>
            <IonText color="primary" style={{ fontSize: '12px' }}>
              Note: Add Side View of Each Component to get the best results
            </IonText>
          </IonCardContent>
          <IonCardSubtitle>
            <IonButton onClick={resetCache}>Reset</IonButton>
          </IonCardSubtitle>
        </IonCard>
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
    </>
  );
};

export default PCBuilder;
