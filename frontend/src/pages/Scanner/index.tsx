import React from "react";
import {
  StyledButton2,
  StyledButton3,
  StyledButton5,
} from "../../common/Button/styles";
import { OrbitProgress } from "react-loading-indicators";
import useApi from "../../hooks/useApi";
import useClient from "../../hooks/useClient";
import Container from "../../common/Container";
import ScrollToTop from "../../common/ScrollToTop";
import "../../styles/App.css";

const Scanner: React.FC = () => {
  const { handleSendToAPI, downloadPdf, scannedData, loading, data } = useApi();
  const { uploadedImage, handleImageUpload, copyToClipboard } = useClient();

  return (
    <Container>
      <ScrollToTop />
      <div className="app">
  <main className="content">
    <div className="receipt-section">
      <h2 className="section-title">Select Receipt</h2>
      <div className="receipt-preview">
        <img
          id="image-preview"
          src="https://via.placeholder.com/300x400"
          alt="Scanned Receipt"
          className="receipt-image"
        />
      </div>
      <input type="file" onChange={handleImageUpload} className="file-input" />
      <StyledButton2
              style={{ width: "100%" }}
              onClick={() => handleSendToAPI(uploadedImage)}
              disabled={loading}
            >
              {loading ? "Processing..." : "Scan Receipt"}
            </StyledButton2>
    </div>

    <div className="scanned-data-section">
      <h2 className="section-title">Scanned Data</h2>
      {loading ? <OrbitProgress color="#0362fc" size="medium" text="" textColor="" /> 
       : data ? 
       <div className="data-card">
        <p><strong>Company Name:</strong> {scannedData.CompanyName}</p>
        <p><strong>Address:</strong> {scannedData.Address}</p>
        <p><strong>Tax ID:</strong> {scannedData.TaxID}</p>
        <p><strong>Date:</strong> {scannedData.Date}</p>
        <p><strong>Total:</strong> {scannedData.Total}</p>
        <p><strong>Tax:</strong> {scannedData.Tax}</p>
        
      </div>
      
    
      : ""}
      {data && (
  <>
    <StyledButton3 style={{ width: "100px", height: "44px", fontSize: "12px" }} onClick={downloadPdf}>
      Download PDF
    </StyledButton3>
    <StyledButton5 style={{ width: "100px", height: "44px", fontSize: "12px" }} onClick={copyToClipboard}>
      Copy as JSON
    </StyledButton5>
  </>)}
      
    </div>
  </main>
</div>

    </Container>
  );

};

export default Scanner;