type CaseSizeKey = "Full Tower" | "Mid-Tower" | "Small Form Factor (SFF)" | "Rackmount";

export const caseSizes: Record<CaseSizeKey, { Height: string; Width: string; Depth: string; Description: string }> = {
  "Full Tower": {
    Height: "22-24+ inches (56-61+ cm)",
    Width: "8-10 inches (20-25 cm)",
    Depth: "18-22+ inches (46-56+ cm)",
    Description: "Full tower cases are the largest size of PC cases, offering plenty of space for high-performance gaming rigs, including components like graphics cards and cooling systems."
  },
  "Mid-Tower": {
    Height: "17-20 inches (43-51 cm)",
    Width: "7-8 inches (18-20 cm)",
    Depth: "16-18 inches (41-46 cm)",
    Description: "Mid-tower cases are a more compact option, suitable for smaller builds but still offering ample space for components like graphics cards and cooling systems."
  },
  "Small Form Factor (SFF)": {
    Height: "8-12 inches (20-30 cm)",
    Width: "4-6 inches (10-15 cm)",
    Depth: "10-14 inches (25-36 cm)",
    Description: "SFF cases are the smallest commercially available PC cases, requiring careful planning for component selection due to strict size limitations."
  },
  // Update RackMount Standard
  Rackmount: {
    Description: "Rackmount cases are designed to fit into server racks, used mainly in data centers or for business and power user applications. They are not typically suitable for standard PC builds.",
    Height: "8-12 inches (20-30 cm)",
    Width: "4-6 inches (10-15 cm)",
    Depth: "10-14 inches (25-36 cm)",
  }
};

// Now you can safely access the case size using dynamic keys
const caseName: CaseSizeKey = "Full Tower"; // This can be any of the keys
const caseDetails = caseSizes[caseName]; // No TypeScript error here
console.log(caseDetails.Description);
