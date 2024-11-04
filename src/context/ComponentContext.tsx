import React, { createContext, useContext, useState } from 'react';

interface Component {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  imageSrc?: string;
  link?: string; // Optional link for product
  specs?: string; // Optional specs for product
}

interface ComponentContextType {
  components: Component[];
  addComponent: (component: Component) => void;
  updateComponent: (id: string, updatedComponent: Partial<Component>) => void;
  removeComponent: (id: string) => void;
}

const ComponentContext = createContext<ComponentContextType | undefined>(undefined);

export const ComponentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [components, setComponents] = useState<Component[]>([]);

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

export const useComponents = (): ComponentContextType => {
  const context = useContext(ComponentContext);
  if (!context) {
    throw new Error('useComponents must be used within a ComponentProvider');
  }
  return context;
};
