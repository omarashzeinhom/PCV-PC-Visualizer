import React, { useState, useRef } from 'react';

interface ComponentProps {
  component: {
    id: string;
    type: string;
    x: number;
    y: number;
    width: number; // Added width for resizing
    height: number; // Added height for resizing
    imageSrc?: string;
    link?: string; // Optional link
    specs?: string; // Optional specs
  };
  onDragEnd: (id: string, x: number, y: number, width: number, height: number) => void; // Updated signature
}

const PCComponent: React.FC<ComponentProps> = ({ component, onDragEnd }) => {
  const { id, type, x, y, imageSrc, link, specs, width, height } = component; // Destructure width and height
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const [size, setSize] = useState({ width, height });
  const offset = useRef({ x: 0, y: 0 });
  const resizeRef = useRef<HTMLDivElement | null>(null); // Reference to resize handle

  const getSize = () => {
    return {
      width: `${size.width}px`,
      height: `${size.height}px`,
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === resizeRef.current) return; // Prevent dragging when clicking the resize handle
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
    } else if (isResizing) {
      const newWidth = e.clientX - position.x; // Resize width based on mouse position
      const newHeight = e.clientY - position.y; // Resize height based on mouse position
      setSize({ width: newWidth < 50 ? 50 : newWidth, height: newHeight < 50 ? 50 : newHeight }); // Minimum size
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd(id, position.x, position.y, size.width, size.height); // Pass size
    } else if (isResizing) {
      setIsResizing(false);
      onDragEnd(id, position.x, position.y, size.width, size.height); // Pass size
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.stopPropagation(); // Prevent triggering mouse down on the component
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
          border: '1px solid #000', // Add a border for visibility
        }}
        onMouseDown={handleMouseDown}
      >
        {imageSrc ? (
          <img src={imageSrc} alt={type} style={{ width: '100%', height: '100%' }} />
        ) : (
          type.toUpperCase()
        )}
        {/* Resize handle */}
        <div
          ref={resizeRef}
          onMouseDown={handleResizeMouseDown}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '10px',
            height: '10px',
            backgroundColor: 'blue',
            cursor: 'nwse-resize', // Cursor indicates resizing
          }}
        />
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
