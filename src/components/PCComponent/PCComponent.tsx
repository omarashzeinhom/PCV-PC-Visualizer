import React from 'react';

interface ComponentProps {
  component: {
    id: string;
    type: string;
    x: number;
    y: number;
  };
}

const PCComponent: React.FC<ComponentProps> = ({ component }) => {
  const { type, x, y } = component;

  const getColor = (type: string) => {
    switch (type) {
      case 'cpu':
        return 'red';
      case 'gpu':
        return 'blue';
      case 'ram':
        return 'green';
      case 'motherboard':
        return 'gray';
      case 'cpuCooler':
        return 'purple';
      case 'psu':
        return 'black';
      default:
        return 'orange';
    }
  };

  const getSize = (type: string) => {
    return type === 'motherboard' ? { width: '120px', height: '80px' } : { width: '40px', height: '20px' };
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        ...getSize(type),
        backgroundColor: getColor(type),
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {type.toUpperCase()}
    </div>
  );
};

export default PCComponent;
