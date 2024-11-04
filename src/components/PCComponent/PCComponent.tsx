import React, { useState, useRef } from 'react';

interface ComponentProps {
  component: {
    id: string;
    type: string;
    x: number;
    y: number;
    width: number; // Dynamic width
    height: number; // Dynamic height
    imageSrc?: string;
    link?: string; // URL for the component
  };
  onDragEnd: (id: string, x: number, y: number) => void;
  onResize: (id: string, width: number, height: number) => void;
}

const PCComponent: React.FC<ComponentProps> = ({ component, onDragEnd, onResize }) => {
  const { id, type, x, y, imageSrc, link, width, height } = component;
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const offset = useRef({ x: 0, y: 0 });

  const getSize = () => ({
    width: `${width}px`,
    height: `${height}px`,
  });

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

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const newWidth = prompt('Enter new width (px):', `${width}`) || `${width}`;
    const newHeight = prompt('Enter new height (px):', `${height}`) || `${height}`;
    
    onResize(id, parseInt(newWidth, 10), parseInt(newHeight, 10));
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
        ...getSize(),
        backgroundColor: imageSrc ? 'transparent' : 'lightgray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: type === 'case' ? 0 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onContextMenu={handleContextMenu} // Enable right-click menu
    >
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img src={imageSrc} alt={type} style={{ width: '100%', height: '100%' }} />
        </a>
      ) : (
        type.toUpperCase()
      )}
    </div>
  );
};

export default PCComponent;
