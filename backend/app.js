const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT","OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));


app.use(bodyParser.json({ limit: '10mb' }));

let filename = ``

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       const dir = './Receipts';
//       if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir);
//       }
//       cb(null, dir); 
//     },
//     filename: (req, file, cb) => {
//       const ext = path.extname(file.originalname);
//       filename = `${Date.now()}${ext}`;
//       cb(null, filename); 
//     }
//   });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './tmp'); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    filename = `${Date.now()}${ext}`;
    cb(null, filename);

    // Global dosya adı yerine, işlem yaparken kullanabilirsiniz
    //req.savedFilename = newFilename;
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 25 * 1024 * 1024 },
});



app.get("/",(req,res)=>{
  res.send("hello world")
})


app.post('/process', upload.single('file'), async (req, res) => {
  try {
    const file = req.file

    if (!file) {
      console.log("errorfile")
      return res.status(400).send({ error: 'Dosya yüklenemedi.' });
    }

    const filepath = "./tmp" + "/" + filename;

    const imageBytes = fs.readFileSync(filepath);
    const base64Image = imageBytes.toString('base64');

    const apiKey = process.env.API_KEY;

    const requestBody = {
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: process.env.PROMPT
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 2048,
      temperature: 1.0
    };

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const json = await response.data;
    console.log(json)

    let content = json.choices[0].message.content;

    const jsonString = content.replace(/```json\n|\n```/g, '').trim();

    const parsedData = JSON.parse(jsonString);

    res.status(200).send(parsedData)

  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
});
