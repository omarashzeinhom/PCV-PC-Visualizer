import React, { useState, useRef } from 'react';

interface ComponentProps {
  component: {
    id: string;
    type: string;
    x: number;
    y: number;
    imageSrc?: string;
    link?: string; // Added optional link
    specs?: string; // Added optional specs
  };
  onDragEnd: (id: string, x: number, y: number) => void;
}

const PCComponent: React.FC<ComponentProps> = ({ component, onDragEnd }) => {
  const { id, type, x, y, imageSrc, link, specs } = component; // Destructure link and specs
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const offset = useRef({ x: 0, y: 0 });

  const getSize = (type: string) => {
    switch (type) {
      case 'case':
        return { width: '100%', height: '100%' }; // Case fills the canvas
      case 'cpu':
        return { width: '60px', height: '60px' }; // Slightly larger CPU
      case 'gpu':
        return { width: '400px', height: '250px' }; // Wider GPU
      case 'ram':
        return { width: '20px', height: '70px' }; // Adjusted RAM size
      case 'motherboard':
        return { width: '400px', height: '300px' }; // Larger motherboard
      case 'cpuCooler':
        return { width: '70px', height: '70px' }; // Slightly larger CPU cooler
      case 'psu':
        return { width: '150px', height: '150px' }; // Wider PSU
      default:
        return { width: '40px', height: '20px' }; // Default size for unknown types
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
    <div>
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
      {/* Specifications and Link Below */}
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        {specs && <div style={{ fontSize: '12px' }}>{specs}</div>}
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: 'blue' }}>
            View Product
          </a>
        )}
      </div>
    </div>
  );
};

export default PCComponent;
