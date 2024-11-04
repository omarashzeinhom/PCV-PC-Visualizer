import React from 'react';

interface ComponentProps {
  component: {
    id: string;
    type: string;
    x: number;
    y: number;
    imageSrc?: string;
  };
}

const PCComponent: React.FC<ComponentProps> = ({ component }) => {
  const { type, x, y, imageSrc } = component;

  const getSize = (type: string) => {
    switch (type) {
      case 'case':
        return { width: '100%', height: '100%' }; // full container background
      case 'cpu':
        return { width: '50px', height: '50px' };
      case 'gpu':
        return { width: '150px', height: '75px' };
      case 'ram':
        return { width: '20px', height: '60px' };
      case 'motherboard':
        return { width: '200px', height: '200px' };
      case 'cpuCooler':
        return { width: '60px', height: '60px' };
      case 'psu':
        return { width: '80px', height: '80px' };
      default:
        return { width: '40px', height: '20px' };
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        ...getSize(type),
        backgroundColor: imageSrc ? 'transparent' : 'lightgray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: type === 'case' ? 0 : 1, // case behind other components
      }}
    >
      {imageSrc ? (
        <img src={imageSrc} alt={type} style={{ width: '100%', height: '100%' }} />
      ) : (
        type.toUpperCase()
      )}
    </div>
  );
};

export default PCComponent;
