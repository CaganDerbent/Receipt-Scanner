import React, { useState } from 'react';
import './App.css';

//test

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [scannedData, setScannedData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        const preview = reader.result;
        document.getElementById('image-preview').src = preview;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendToAPI = async () => {
    if (!uploadedImage) {
      alert("Please upload an image first.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', uploadedImage); 

      const response = await fetch('http://localhost:3001/process', {
        method: 'POST',
        body: formData, 
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error:", errorData);
        throw new Error("Failed to fetch data from API.");
      }
      const data = await response.json();

      setScannedData(data)
    } catch (error) {
      console.error("Error:", error);
      setScannedData("Error fetching data from API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="upload-section">
        <h3>Select Receipt</h3>
        <div className="upload-box" style={{height:"420px"}}>
          {uploadedImage ? (
            <img id="image-preview" alt="Uploaded"  style={{ width: "100%", height: "100%", objectFit: "contain" }} /> 
          ) : (
            <p>Supported formats: .jpeg .jpg .gif .png</p>
          )}
          <input type="file" onChange={handleImageUpload} accept="image/*" />
        </div>
        <button onClick={handleSendToAPI} disabled={loading}>
          {loading ? "Loading..." : "Scan Receipt"}
        </button>
      </div>
      <div className="result-section">
        <h3>Scanned Data</h3>
        <div className="upload-box2" style={{height:"420px"}}>
          <h4>CompanyName <p>{scannedData.CompanyName}</p></h4>
          <h4>Address <p>{scannedData.Address}</p></h4>
          <h4>TaxID <p>{scannedData.TaxID}</p></h4>
          <h4>Date <p>{scannedData.Date}</p></h4>
          <h4>Total <p>{scannedData.Total}</p></h4>
          <h4>Tax <p>{scannedData.Tax}</p></h4>
        </div>
      </div>
    </div>
  );
}

export default App;
