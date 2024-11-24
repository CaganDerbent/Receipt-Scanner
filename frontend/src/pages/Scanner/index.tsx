import { lazy, useState } from "react";
import IntroContent from "../../content/IntroContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import AboutContent from "../../content/AboutContent.json";
import MissionContent from "../../content/MissionContent.json";
import ProductContent from "../../content/ProductContent.json";
import ContactContent from "../../content/ContactContent.json";
import '../../App.css';
import { StyledButton,StyledButton2 } from "../../common/Button/styles";
import {OrbitProgress} from "react-loading-indicators";

const Contact = lazy(() => import("../../components/ContactForm"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));

interface ScannedData {
  CompanyName: string;
  Address: string;
  TaxID: string;
  Date: string;
  Total: string;
  Tax: string;
}

const Scanner: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [data, setData] = useState<boolean | null>(false);
  const [scannedData, setScannedData] = useState<ScannedData>({
    CompanyName: "",
    Address: "",
    TaxID: "",
    Date: "",
    Total: "",
    Tax: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        const preview = reader.result as string;
        const imageElement = document.getElementById('image-preview') as HTMLImageElement;
        if (imageElement) {
          imageElement.src = preview;
        }
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

      const response = await fetch('https://receipt-scanner-server.vercel.app/process', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error:", errorData);
        throw new Error("Failed to fetch data from API.");
      }
      const data = await response.json();
      setScannedData(data);
      setData(true)
    } catch (error) {
      console.error("Error:", error);
      setScannedData({
        CompanyName: "Error",
        Address: "Error",
        TaxID: "Error",
        Date: "Error",
        Total: "Error",
        Tax: "Error",
      });
    } finally {
      setLoading(false);
    }
  };

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
      <StyledButton2 style={{width:"100%"}} onClick={handleSendToAPI} disabled={loading}>
      {loading ? "Processing..." : "Scan Receipt"}
      </StyledButton2>
    </div>

    <div className="scanned-data-section">
      <h2 className="section-title">Scanned Data</h2>
      {loading ? <OrbitProgress color="#0362fc" size="medium" text="" textColor="" /> 
       : data ? <div className="data-card">
        <p><strong>Company Name:</strong> {scannedData.CompanyName}</p>
        <p><strong>Address:</strong> {scannedData.Address}</p>
        <p><strong>Tax ID:</strong> {scannedData.TaxID}</p>
        <p><strong>Date:</strong> {scannedData.Date}</p>
        <p><strong>Total:</strong> {scannedData.Total}</p>
        <p><strong>Tax:</strong> {scannedData.Tax}</p>
      </div> : ""}
    </div>
  </main>
</div>

    </Container>
  );
};

export default Scanner;
