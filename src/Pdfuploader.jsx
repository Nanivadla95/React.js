import React from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function PDFUploader({ onUpload }) {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = async function () {
        const typedArray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;

        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map(item => item.str).join(" ");
          text += pageText + "\n";
        }

        onUpload(text);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Please upload a valid PDF.");
    }
  };

  return (
    <div>
      <h2>Upload PDF Document</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
    </div>
    
  );
}

export default PDFUploader;
