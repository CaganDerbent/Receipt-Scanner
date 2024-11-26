const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const cors = require("cors");
const bodyParser = require('body-parser');
const { PDFDocument, rgb } = require('pdf-lib');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const fontkit = require('@pdf-lib/fontkit');

const { scanReceipt } = require('./Controllers/ScanController');
const { createPdf } = require('./Controllers/FileController');

const app = express();
const port = 3001;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(bodyParser.json({ limit: '10mb' }));

let filename = ``;
let id = "";
let ext = "";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/tmp/receipts'); 
  },
  filename: (req, file, cb) => {
    ext = path.extname(file.originalname);
    id = uuidv4();
    filename = `receipt_${id}${ext}`;

    req.fileInfo = { filename, ext, id };
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 25 * 1024 * 1024 },
});

app.post('/process', upload.single('file'), scanReceipt);
app.post('/pdf', upload.single('file'), createPdf);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3001,()=>{console.log("Server running...")})
