// src/ComponentDetails.tsx

import React from 'react';

interface ComponentDetailsProps {
  selectedComponent: {
    specs?: string;
    link?: string;
  } | null;
}

const ComponentDetails: React.FC<ComponentDetailsProps> = ({ selectedComponent }) => {
  if (!selectedComponent) return null; // Return nothing if no component is selected

  return (
    <div style={{ padding: '10px', border: '1px solid black' }}>
      <h3>Specifications</h3>
      <p>{selectedComponent.specs}</p>
      {selectedComponent.link && (
        <a href={selectedComponent.link} target="_blank" rel="noopener noreferrer">
          View Product
        </a>
      )}
    </div>
  );
};

export default ComponentDetails;
