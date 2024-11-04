import { IonCard, IonCardContent, IonItem, IonLabel, IonText, IonToast } from '@ionic/react';
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
    const { id, type, x, y, imageSrc, link, specs, width, height } = component;
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [isOutlineVisible, setIsOutlineVisible] = useState(false); // Track outline visibility
    const [position, setPosition] = useState({ x, y });
    const [size, setSize] = useState({ width, height });
    const offset = useRef({ x: 0, y: 0 });
    const resizeRef = useRef<HTMLDivElement | null>(null);

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

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent the default context menu from appearing
        setIsOutlineVisible(!isOutlineVisible); // Toggle outline visibility
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
                onContextMenu={handleRightClick} // Use right-click to toggle outline
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
                    border: isOutlineVisible ? '2px dashed red' : 'none', // Outline when visible
                }}
                onMouseDown={handleMouseDown}
            >
                {imageSrc ? (
                    <img src={imageSrc} alt={type} style={{ width: '100%', height: '100%' }} />
                ) : (
                    type.toUpperCase()
                )}
                {isOutlineVisible && ( // Only show the resize handle when outline is visible
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
                            cursor: 'nwse-resize',
                        }}
                    />
                )}
            </div>
       
        </div>
    );
};

export default PCComponent;
