// Add a global declaration for the pdfjsLib object provided by the CDN script
declare const pdfjsLib: any;

/**
 * Extracts text content from a given PDF file.
 * @param file The PDF file object from an input element.
 * @returns A promise that resolves with the extracted text as a string.
 */
export const extractTextFromPdf = async (file: File): Promise<string> => {
  const reader = new FileReader();
  
  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      if (!event.target?.result) {
        return reject(new Error("Failed to read file."));
      }

      try {
        const pdf = await pdfjsLib.getDocument({ data: event.target.result }).promise;
        let allText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          allText += pageText + '\n\n'; // Add newlines to separate page content
        }
        resolve(allText.trim());
      } catch (error) {
        console.error("Error parsing PDF:", error);
        reject(new Error("Could not parse the PDF file. Please ensure it's a valid PDF."));
      }
    };

    reader.onerror = () => {
      reject(new Error("An error occurred while reading the file."));
    };
    
    reader.readAsArrayBuffer(file);
  });
};
