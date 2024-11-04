import React, { useState, useRef } from 'react';

interface ComponentProps {
  component: {
    id: string;
    type: string;
    x: number;
    y: number;
    imageSrc?: string;
  };
  onDragEnd: (id: string, x: number, y: number) => void;
}

const PCComponent: React.FC<ComponentProps> = ({ component, onDragEnd }) => {
  const { id, type, x, y, imageSrc } = component;
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const offset = useRef({ x: 0, y: 0 });

  const getSize = (type: string) => {
    switch (type) {
      case 'case':
        return { width: '100%', height: '100%' };
      case 'cpu':
        return { width: '50px', height: '50px' };
      case 'gpu':
        return { width: '150px', height: '30px' };
      case 'ram':
        return { width: '20px', height: '60px' };
      case 'motherboard':
        return { width: '200px', height: '200px' };
      case 'cpuCooler':
        return { width: '60px', height: '60px' };
      case 'psu':
        return { width: '80px', height: '40px' };
      default:
        return { width: '40px', height: '20px' };
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - offset.current.x;
      const newY = e.clientY - offset.current.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    onDragEnd(id, position.x, position.y);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        ...getSize(type),
        backgroundColor: imageSrc ? 'transparent' : 'lightgray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: type === 'case' ? 0 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
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
