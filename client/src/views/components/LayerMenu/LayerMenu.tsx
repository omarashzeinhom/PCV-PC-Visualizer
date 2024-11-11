// LayerMenu.tsx
import React from 'react';
import './LayerMenu.css';

interface LayerMenuProps {
    components: Array<any>;
    onSelectComponent: (id: string) => void;
    selectedComponentId: string | null;
}

const LayerMenu: React.FC<LayerMenuProps> = ({ components, onSelectComponent, selectedComponentId }) => {
    return (
        <div className="layer-menu">
            <h3>Layers</h3>
            {components.map((component) => (
                <div
                    key={component.id}
                    className={`layer-item ${selectedComponentId === component.id ? 'selected' : ''}`}
                    onClick={() => onSelectComponent(component.id)}
                >
                    {component.type.toUpperCase()}
                </div>
            ))}
        </div>
    );
};

export default LayerMenu;
