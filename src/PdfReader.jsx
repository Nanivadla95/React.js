import React from "react";

export default function PDFReader({ text }) {
  return (
    <div style={{ padding: "20px", background: "#f7f7f7", borderRadius: "8px", marginTop: "20px" }}>
      <h2>Extracted PDF Text</h2>
      <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
        {text}
      </pre>
    </div>
  );
}
