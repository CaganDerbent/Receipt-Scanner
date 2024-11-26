import { useState } from "react";

interface ScannedData {
  CompanyName: string;
  Address: string;
  TaxID: string;
  Date: string;
  Total: string;
  Tax: string;
}

const useClient = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [scannedData, setScannedData] = useState<ScannedData>({
    CompanyName: "",
    Address: "",
    TaxID: "",
    Date: "",
    Total: "",
    Tax: "",
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        const preview = reader.result as string;
        const imageElement = document.getElementById(
          "image-preview"
        ) as HTMLImageElement;
        if (imageElement) {
          imageElement.src = preview;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = () => {
    const jsonString = JSON.stringify(scannedData, null, 2);

    navigator.clipboard.writeText(jsonString)
      .then(() => {
        alert("JSON copied successfully !");
      })
      .catch((error) => {
        console.error("Copy error: ", error);
      });
  };

  return { uploadedImage, handleImageUpload, copyToClipboard };
};

export default useClient;