import React, { createContext, useContext, useState, useEffect } from 'react';

interface Component {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  imageSrc?: string;
  link?: string;
  specs?: string;
}

interface ComponentContextProps {
  components: Component[];
  addComponent: (component: Component) => void;
  updateComponent: (id: string, updatedComponent: Partial<Component>) => void;
  removeComponent: (id: string) => void;
}

const ComponentContext = createContext<ComponentContextProps | undefined>(undefined);

export const ComponentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [components, setComponents] = useState<Component[]>(() => {
    const savedComponents = localStorage.getItem('components');
    return savedComponents ? JSON.parse(savedComponents) : [];
  });

  useEffect(() => {
    localStorage.setItem('components', JSON.stringify(components));
  }, [components]);

  const addComponent = (component: Component) => {
    setComponents((prev) => [...prev, component]);
  };

  const updateComponent = (id: string, updatedComponent: Partial<Component>) => {
    setComponents((prev) =>
      prev.map((component) => (component.id === id ? { ...component, ...updatedComponent } : component))
    );
  };

  const removeComponent = (id: string) => {
    setComponents((prev) => prev.filter((component) => component.id !== id));
  };

  return (
    <ComponentContext.Provider value={{ components, addComponent, updateComponent, removeComponent }}>
      {children}
    </ComponentContext.Provider>
  );
};

export const useComponents = () => {
  const context = useContext(ComponentContext);
  if (context === undefined) {
    throw new Error('useComponents must be used within a ComponentProvider');
  }
  return context;
};
