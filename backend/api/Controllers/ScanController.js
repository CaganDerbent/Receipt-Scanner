const fs = require('fs');
const axios = require('axios');
const path = require('path');
require('dotenv').config();


const scanReceipt = async (req, res) => {
    try {
      const { filename,ext,id } = req.fileInfo;

      console.log(filename,ext,id)
      const file = req.file
  
      if (!file) {
        console.log("errorfile")
        return res.status(400).json({ error: 'File not uploaded.' });
      }
  
      // "../../backend/tmp/receipts" + "/" + filename;

      const filepath = path.join(__dirname, "../../tmp/",filename);
  
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
  
      res.status(200).send({parsedData,filename,ext,id})
  
    } catch (err) {
      console.log(err)
      res.status(400).json({error: err});
    }
  };

  module.exports = { scanReceipt };