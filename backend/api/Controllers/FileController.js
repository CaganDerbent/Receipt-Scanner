const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');

const createPdf = async (req, res) => {
    try {
      const jsonData = req.body.scannedData;

      const {filename,ext,id} = req.body;
      
      // ../../backend/tmp/templates/template.pdf
      const existingPdfBytes = fs.readFileSync(path.join(__dirname,'../../tmp/templates/template.pdf'));
      
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      pdfDoc.registerFontkit(fontkit);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
  
      // ../../backend/tmp/fonts/cour.ttf
      const fontBytes = fs.readFileSync(path.join(__dirname,'../../tmp/fonts/cour.ttf'));
      const customFont = await pdfDoc.embedFont(fontBytes);
  
      const fontBytes2 = fs.readFileSync(path.join(__dirname,'../../tmp/fonts/courbd.ttf'));
      const customFontbd = await pdfDoc.embedFont(fontBytes2);
  
  
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");
  
      firstPage.drawText("ID: " + id, { x: 70, y: 640, size: 12, font: customFontbd });
      firstPage.drawText("Creation Date: " + formattedDate, { x: 70, y: 620, size: 12, font: customFontbd });
  
      firstPage.drawText("Company Name: " + jsonData.CompanyName, { x: 70, y: 560, size: 12, font: customFont });
      firstPage.drawText("Address: " + jsonData.Address, { x: 70, y: 540, size: 12, font: customFont });
      firstPage.drawText("Date: " + jsonData.Date, { x: 70, y: 520, size: 12, font: customFont });
      firstPage.drawText("Tax ID: " + jsonData.TaxID, { x: 70, y: 500, size: 12, font: customFont });
      firstPage.drawText("Total: " + jsonData.Total, { x: 70, y: 480, size: 12, font: customFont });
      firstPage.drawText("Tax: " + jsonData.Tax, { x: 70, y: 460, size: 12, font: customFont });
  
      // ../../tmp/receipts/receipt_${id}${ext}
      const filepathimg = path.join(__dirname, `../../tmp/receipts/receipt_${id}${ext}`);
      const fileExtension = path.extname(filepathimg);
  
      if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
        const imageBytes = fs.readFileSync(`${filepathimg}`);
        image = await pdfDoc.embedJpg(imageBytes);
    } else if (fileExtension === '.png') {
        const imageBytes = fs.readFileSync(`${filepathimg}`);
        image = await pdfDoc.embedPng(imageBytes);
    } else {
        throw new Error(`File type not supported: ${fileExtension}`);
    }
  
       const { width, height } = image;
       firstPage.drawImage(image, {
           x: 70, 
           y: 150, 
           width: 180, 
           height: 250 
       });


       // ../../../backend/
       // ../../../backend/tmp/documents/
       const fileName = path.join(__dirname, "../../tmp/documents", "receipt_" + id + ".pdf");
       const filepath = path.join(__dirname, "../../tmp/documents", "receipt_" + id + ".pdf");
  
      const pdfBytes = await pdfDoc.save();
      fs.writeFileSync(fileName, pdfBytes);
  
      res.sendFile(path.resolve(filepath), (err) => {
        if (err) {
          console.error('File Error:', err);
          res.status(404).json({error : 'File not found.'});
        }
      });
  
  
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err });
    }
  };

  module.exports = { createPdf };