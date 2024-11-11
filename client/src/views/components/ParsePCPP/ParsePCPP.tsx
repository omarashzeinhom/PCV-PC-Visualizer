import React, { useState } from 'react';
import { IonItem, IonLabel, IonTextarea, IonButton, IonList, IonItemDivider, IonItemGroup, IonText } from '@ionic/react';

// Define types for parsed data
interface Part {
  type: string;
  name: string;
  link: string;
  price: string;
}

interface ParsedData {
  parts: Part[];
  totalPrice: string;
  date: string;
}

interface PCPartPickerParserProps {
  // You can pass any props if needed, such as initial HTML content
}

const PCPartPickerParser: React.FC<PCPartPickerParserProps> = () => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);

  // Parse the HTML content from PCPartPicker
  const parsePCPartPicker = (html: string): ParsedData => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const parts: Part[] = [];

    // Select all rows in the table (excluding the last two footer rows)
    const rows = doc.querySelectorAll('table.pcpp-part-list tbody tr');
    rows.forEach(row => {
      const type = row.querySelector('.pcpp-part-list-type');
      const item = row.querySelector('.pcpp-part-list-item');
      const price = row.querySelector('.pcpp-part-list-price');

      // If all data is present, extract it
      if (type && item && price) {
        const part: Part = {
          type: type.textContent?.trim() || '',
          name: item.textContent?.trim() || '',
          link: item.querySelector('a') ? item.querySelector('a')!.href : '',
          price: price.textContent?.trim() || ''
        };

        // Clean price if it's the format "Purchased For"
        if (part.price.startsWith('Purchased For')) {
          part.price = part.price.replace('Purchased For', '').trim();
        }

        parts.push(part);
      }
    });

    // Extract total cost and date
    const totalPrice = doc.querySelector('.pcpp-part-list-total-price') 
      ? doc.querySelector('.pcpp-part-list-total-price')!.textContent?.trim() || '' 
      : '';
    
    const date = doc.querySelector('.pcpp-part-list-price-note') 
      ? doc.querySelector('.pcpp-part-list-price-note')!.textContent?.trim() || '' 
      : '';

    return {
      parts,
      totalPrice,
      date
    };
  }

  // Handle the button click to parse the HTML
  const processPCPartPicker = (): void => {
    if (htmlContent.trim()) {
      setParsedData(parsePCPartPicker(htmlContent.trim()));
    } else {
      alert('Please paste the PCPartPicker HTML first.');
    }
  }

  return (
    <IonItemGroup>
      {/* Textarea for HTML input */}
      <IonItem>
        <IonLabel position="floating">PCPartPicker HTML</IonLabel>
        <IonTextarea
          value={htmlContent}
          onIonInput={(e) => setHtmlContent((e.target as unknown as HTMLTextAreaElement).value)}          rows={6}
        />
      </IonItem>

      {/* Button to trigger the parsing */}
      <IonButton expand="full" onClick={processPCPartPicker}>Parse HTML</IonButton>

      {/* Display parsed data */}
      {parsedData && (
        <>
          <IonList>
            {parsedData.parts.map((part, index) => (
              <IonItem key={index}>
                <IonLabel>
                  <h2>{part.type}:</h2>
                  <p><a href={part.link} target="_blank" rel="noopener noreferrer">{part.name}</a></p>
                  <p>{part.price}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
          <IonItemDivider />
          <IonItem>
            <IonLabel>
              <h2>Total Price:</h2>
              <p>{parsedData.totalPrice}</p>
              <h3>{parsedData.date}</h3>
            </IonLabel>
          </IonItem>
        </>
      )}
    </IonItemGroup>
  );
};

export default PCPartPickerParser;
