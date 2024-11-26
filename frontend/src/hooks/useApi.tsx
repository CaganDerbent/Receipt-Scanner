import { useState } from "react";

interface ScannedData {
  CompanyName: string;
  Address: string;
  TaxID: string;
  Date: string;
  Total: string;
  Tax: string;
}

const useApi = () => {
  const [filename, setFilename] = useState<string | null>(null);
  const [ext, setExt] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [data, setData] = useState<boolean>(false);
  const [scannedData, setScannedData] = useState<ScannedData>({
    CompanyName: "",
    Address: "",
    TaxID: "",
    Date: "",
    Total: "",
    Tax: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendToAPI = async (uploadedImage: File | null) => {
    if (!uploadedImage) {
      alert("Please upload an image first.");
      return;
    }

    setLoading(true);
    setData(false);
    try {
      const formData = new FormData();
      formData.append("file", uploadedImage);

      const response = await fetch(
        "https://receipt-scanner-server.vercel.app/process",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error:", errorData);
        throw new Error("Failed to fetch data from API.");
      }
      const data = await response.json();
      setScannedData(data.parsedData);
      setFilename(data.filename);
      setExt(data.ext);
      setId(data.id);
      setData(true);
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

  const downloadPdf = async () => {
    try {
      const dataToSend = {
        scannedData,
        filename,
        ext,
        id,
      };

      const response = await fetch(
        "https://receipt-scanner-server.vercel.app/pdf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error:", errorData);
        throw new Error("Failed to send data to API.");
      }

      const pdfBlob = await response.blob();

      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "generated.pdf";
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  return { handleSendToAPI, downloadPdf, scannedData, loading, data };
};

export default useApi;