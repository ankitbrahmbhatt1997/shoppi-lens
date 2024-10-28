import React, { useState } from "react";
import { useRouter } from 'next/router';
import UploadArea from "./UploadArea";
import UrlInput from "./UrlInput";
import CloseButton from "./CloseButton";

interface GoogleLensUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoogleLensUpload: React.FC<GoogleLensUploadProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleImageUpload = async (file: File) => {
    setSelectedFile(file);
    await encodeAndRedirect(file);
  };

  const encodeAndRedirect = async (file: File) => {
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        router.push({
          pathname: '/crop-img',
          query: { image: base64String }
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error encoding image:', error);
    }
  };

  const handleUrlSubmit = async () => {
    if (imageUrl) {
      try {
        router.push({
          pathname: '/crop-img',
          query: { image: imageUrl }
        });
      } catch (error) {
        console.error('Error with image URL:', error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex flex-col items-center z-50 absolute top-[-1px] w-[58.2rem] left-[-1px] bg-gray-800 rounded-[24px]">
      <div className="w-full p-[2rem] border border-gray-900 rounded-[24px] shadow-md">
        <div className="relative">
          <h2 className="text-center text-lg font-medium text-white mb-6">
            Search any image with Google Lens
          </h2>
          <CloseButton onClose={onClose} />
        </div>

        <UploadArea
          selectedFile={selectedFile}
          onFileUpload={handleImageUpload}
        />

        <UrlInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          onSubmit={handleUrlSubmit}
        />
      </div>
    </div>
  );
};

export default GoogleLensUpload;
