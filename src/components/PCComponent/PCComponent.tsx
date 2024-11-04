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
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const [size, setSize] = useState({ width: 100, height: 100 });
  const offset = useRef({ x: 0, y: 0 });

  const getSize = () => ({
    width: `${size.width}px`,
    height: `${size.height}px`,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.stopPropagation(); // Prevent triggering drag
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - offset.current.x;
      const newY = e.clientY - offset.current.y;
      setPosition({ x: newX, y: newY });
    }
    if (isResizing) {
      const newWidth = e.clientX - position.x;
      const newHeight = e.clientY - position.y;
      setSize({ width: Math.max(50, newWidth), height: Math.max(50, newHeight) }); // Min size constraints
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd(id, position.x, position.y);
    }
    if (isResizing) {
      setIsResizing(false);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    // Show your context menu here or handle resizing/removal logic
    console.log(`Right clicked on ${type} component`);
  };

  React.useEffect(() => {
    if (isDragging || isResizing) {
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
  }, [isDragging, isResizing]);

  return (
    <div>
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
        onContextMenu={handleContextMenu}
      >
        {imageSrc ? (
          <img src={imageSrc} alt={type} style={{ width: '100%', height: '100%' }} />
        ) : (
          <span>{type.toUpperCase()}</span>
        )}
        <div
          onMouseDown={handleResizeMouseDown}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '10px',
            height: '10px',
            backgroundColor: 'blue',
            cursor: 'nwse-resize',
          }}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          {specs}
        </a>
      </div>
    </div>
  );
};

export default PCComponent;
