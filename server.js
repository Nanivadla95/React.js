
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const pdfParse = require("pdf-parse");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());

app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const data = await pdfParse(req.file.buffer);
    res.json({ text: data.text });
  } catch (error) {
    res.status(500).json({ error: "Failed to parse PDF" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
