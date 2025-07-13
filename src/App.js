import React, { useState } from "react";
import PDFUploader from "./Pdfuploader";
import QuestionBox from "./Questionbox";
import "./App.css";



function App() {
  const [pdfText, setPdfText] = useState("");

  return (
    <div className="App">
      <PDFUploader onUpload={setPdfText} />
      {pdfText && <QuestionBox text={pdfText} />}
    </div>
  );
}

export default App;
