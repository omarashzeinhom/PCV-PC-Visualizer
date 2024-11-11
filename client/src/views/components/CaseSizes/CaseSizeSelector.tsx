import React, { useState } from 'react';
import { IonButton } from '@ionic/react';
import { caseSizes } from '../../../lib/constants/case-sizes';  // import the object
import './CaseSizeSelector.css'; // Make sure the CSS is linked

// Define the prop types for CaseSizeSelector
interface CaseSizeSelectorProps {
  onSizeSelect: (size: string) => void; // Expect a function that takes a string (size)
}

type CaseSizeKey = "Full Tower" | "Mid-Tower" | "Small Form Factor (SFF)" | "Rackmount";

const CaseSizeSelector: React.FC<CaseSizeSelectorProps> = ({ onSizeSelect }) => {
  const [selectedSize, setSelectedSize] = useState<CaseSizeKey>('Full Tower');
  const [selectedCase, setSelectedCase] = useState<any>(caseSizes['Full Tower']); // default Full Tower size

  const handleSizeChange = (size: CaseSizeKey) => {
    setSelectedSize(size);
    setSelectedCase(caseSizes[size]); // Dynamically update the selected case
    onSizeSelect(size); // Call onSizeSelect when size changes
  };

  return (
    <div className="case-size-selector">
      <h3 className="case-size-selector__title">Select Case Size</h3>
      <div className="case-size-selector__sizes">
        {Object.keys(caseSizes).map((size) => (
          <div
            key={size}
            className={`case-size-selector__size case-size-selector__size--${size.toLowerCase().replace(/ /g, '-')}`}
            onClick={() => handleSizeChange(size as CaseSizeKey)} // Type assertion for TypeScript
          >
            <div className={`case-size-selector__outline case-size-selector__outline--${size.toLowerCase().replace(/ /g, '-')}`} />
            <span className="case-size-selector__label">{size}</span>
          </div>
        ))}
      </div>

      <div className="case-size-selector__details">
        <p>{selectedCase.Description}</p>
        {selectedCase.Height && <p><strong>Height:</strong> {selectedCase.Height}</p>}
        {selectedCase.Width && <p><strong>Width:</strong> {selectedCase.Width}</p>}
        {selectedCase.Depth && <p><strong>Depth:</strong> {selectedCase.Depth}</p>}
      </div>

      <div className="case-size-selector__screenshot-area">
        <div
          className={`case-size-selector__case-outline case-size-selector__case-outline--${selectedSize.toLowerCase().replace(/ /g, '-')}`}
        />
      </div>
    </div>
  );
};

export default CaseSizeSelector;
