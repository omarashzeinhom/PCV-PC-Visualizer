import React from 'react';
import './LayerMenu.css';

interface LayerMenuProps {
    components: Array<any>;
    onSelectComponent: (id: string) => void;
    selectedComponentId: string | null;
    onRemoveComponent: (id: string) => void; // Add onRemoveComponent
}

const LayerMenu: React.FC<LayerMenuProps> = ({ components, onSelectComponent, selectedComponentId, onRemoveComponent }) => {
    return (
        <div className="layer-menu">
            <h3>Layers</h3>
            {components.map((component) => (
                <div
                    key={component.id}
                    className={`layer-item ${selectedComponentId === component.id ? 'selected' : ''}`}
                    onClick={() => onSelectComponent(component.id)}
                    style={{gap: "1rem"}}
                >
                    {component.type.toUpperCase()}
                    <button onClick={(e) => { e.stopPropagation(); onRemoveComponent(component.id); }}>
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
};

export default LayerMenu;
