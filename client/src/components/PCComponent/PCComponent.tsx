import React, { useState, useRef, useEffect } from 'react';
import './PCComponent.css';

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
    onResizeEnd: (id: string, width: number, height: number) => void;
}

const PCComponent: React.FC<ComponentProps> = ({ component, onDragEnd, onResizeEnd }) => {
    const { id, type, x, y, imageSrc, width, height } = component;
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [isOutlineVisible, setIsOutlineVisible] = useState(false);
    const [position, setPosition] = useState({ x, y });
    const [size, setSize] = useState({ width, height });
    const offset = useRef({ x: 0, y: 0 });
    const resizeRef = useRef<HTMLDivElement | null>(null);
    const isMobile = window.innerWidth < 768; // Determine if device is mobile


    const getSize = () => {
        return {
            width: `${size.width}px`,
            height: `${size.height}px`,
        };
    };

    // Mouse event handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.target === resizeRef.current) return;
        setIsDragging(true);
        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
        // Disable page scroll on Y-axis
        document.body.style.overflowY = 'hidden';
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            const newX = e.clientX - offset.current.x;
            const newY = e.clientY - offset.current.y;
            setPosition({ x: newX, y: newY });
        } else if (isResizing) {
            const newWidth = e.clientX - position.x;
            const newHeight = e.clientY - position.y;
            setSize({ width: Math.max(50, newWidth), height: Math.max(50, newHeight) });
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            setIsDragging(false);
            onDragEnd(id, position.x, position.y, size.width, size.height);
        } else if (isResizing) {
            setIsResizing(false);
            onResizeEnd(id, size.width, size.height);
        }
        // Enable page scroll on Y-axis
        document.body.style.overflowY = 'auto';
    };

    // Resize handle for mouse
    const handleResizeMouseDown = (e: React.MouseEvent) => {
        setIsResizing(true);
        e.stopPropagation();
    };

    // Touch event handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.target === resizeRef.current) return;
        setIsDragging(true);
        const touch = e.touches[0];
        offset.current = {
            x: touch.clientX - position.x,
            y: touch.clientY - position.y,
        };
        // Disable page scroll on Y-axis
        document.body.style.overflowY = 'hidden';
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (isDragging) {
            const touch = e.touches[0];
            const newX = touch.clientX - offset.current.x;
            const newY = touch.clientY - offset.current.y;
            setPosition({ x: newX, y: newY });
        } else if (isResizing) {
            const touch = e.touches[0];
            const newWidth = touch.clientX - position.x;
            const newHeight = touch.clientY - position.y;
            setSize({ width: Math.max(50, newWidth), height: Math.max(50, newHeight) });
        }
    };

    const handleTouchEnd = () => {
        if (isDragging) {
            setIsDragging(false);
            onDragEnd(id, position.x, position.y, size.width, size.height);
        } else if (isResizing) {
            setIsResizing(false);
            onResizeEnd(id, size.width, size.height);
        }
        // Enable page scroll on Y-axis
        document.body.style.overflowY = 'auto';
    };

    const handleResizeTouchStart = (e: React.TouchEvent) => {
        setIsResizing(true);
        e.stopPropagation();
    };

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOutlineVisible(!isOutlineVisible);
    };


    useEffect(() => {
        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleTouchEnd);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging, isResizing]);

    return (
        <div>
            <div
                onContextMenu={handleRightClick}
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
                    border: isOutlineVisible ? '2px dashed red' : 'none',
                }}
                
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            >
                {imageSrc ? (
                    <img src={imageSrc} alt={type} style={{ width: '100%', height: '100%' }} />
                ) : (
                    type.toUpperCase()
                )}
                {isOutlineVisible && (
                    <div
                        ref={resizeRef}
                        onMouseDown={handleResizeMouseDown}
                        onTouchStart={handleResizeTouchStart} // Touch resize handle
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'blue',
                            cursor: isMobile ? 'nwse-resize' : 'se-resize',
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default PCComponent;
