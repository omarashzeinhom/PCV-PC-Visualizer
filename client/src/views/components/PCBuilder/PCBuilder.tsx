import React, { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCol, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonText, IonToast } from '@ionic/react';
import PCComponent from '../PCComponent/PCComponent';
import './PCBuilder.css';
import { demoComponents, Component } from "../../../lib/constants/demoproducts";
import LayerMenu from '../LayerMenu/LayerMenu';
import CaseSizeSelector from '../CaseSizes/CaseSizeSelector';

const PCBuilder: React.FC = () => {
  const [components, setComponents] = useState<Component[]>(() => {
    const savedComponents = localStorage.getItem('pcComponents');
    return savedComponents ? JSON.parse(savedComponents) : [];
  });
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [imageInputs, setImageInputs] = useState<{ [key: string]: string }>({});
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    localStorage.setItem('pcComponents', JSON.stringify(components));
  }, [components]);

  const handleSelectComponent = (id: string) => {
    setSelectedComponentId(id);
  };
  const removeComponent = (id: string) => {
    setComponents((prev) => prev.filter(component => component.id !== id));
    setSelectedComponentId(null); // Deselect the component after removal
  };

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

 
  const resetCache = () => {
    localStorage.clear();
    setComponents([]);
    console.log('Cache has been reset.');
    alert('Build Has Been Cleared')
};

  return (
    <>
      <div className="pc-builder__screenshot-area">
        {components.map((component) => (
          <PCComponent
            key={component.id}
            component={{
              ...component,
              width: component.width * (device === 'mobile' ? 0.8 : 1),
              height: component.height * (device === 'mobile' ? 0.8 : 1)
            }}
            onDragEnd={handleDragEnd}
            onResizeEnd={handleResizeEnd} 
            isHighlighted={selectedComponentId === component.id}
          />
        ))}
      </div>

      <IonGrid className="pc-builder__grid">
        <IonCard className="pc-builder__card">
          <IonCardHeader>
            <IonText className="pc-builder__note">
              Note: The PC specs are not checked for compatibility; this design is purely for visual representation using images.
            </IonText>
          </IonCardHeader>
          <IonCardContent>
            <IonText className="pc-builder__note">
              Note: Add Side View of Each Component to get the best results
            </IonText>
          </IonCardContent>
          <IonCardSubtitle className="pc-builder__card-subtitle">
            <IonButton onClick={resetCache} className="pc-builder__button--reset">
              Reset
            </IonButton>
          </IonCardSubtitle>
        </IonCard>

        {demoComponents.map((component) => (
          <IonRow key={component.id} className="pc-builder__row">
            <IonCol className="pc-builder__col">
              <IonItem>
                <IonLabel position="floating"></IonLabel>
                <IonInput
                  fill="solid"
                  labelPlacement="floating"
                  label={component?.type?.toUpperCase()}
                  value={imageInputs[component.id] || ''}
                  onIonChange={(e) => setImageInputs({ ...imageInputs, [component.id]: e.detail.value! })}
                  className="pc-builder__input"
                  placeholder={`Enter image link`}
                />
              </IonItem>
            </IonCol>
            <IonCol className="pc-builder__col">
              <IonButton onClick={() => addComponent(component)}>
                Add {component.type.toUpperCase()}
              </IonButton>
            </IonCol>
          </IonRow>
        ))}
      </IonGrid>


      <LayerMenu
        components={components}
        onSelectComponent={handleSelectComponent}
        selectedComponentId={selectedComponentId}
        onRemoveComponent={removeComponent}
      />

<CaseSizeSelector onSizeSelect={(size) => console.log(`Selected Size: ${size}`)} />
  
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
