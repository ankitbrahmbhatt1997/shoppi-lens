import React, { useState } from "react";
import { useRouter } from 'next/router';

interface GoogleLensUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoogleLensUpload: React.FC<GoogleLensUploadProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      await encodeAndRedirect(file);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      await encodeAndRedirect(file);
    }
  };

  const encodeAndRedirect = async (file: File) => {
    try {
      // Create a FileReader to read the file as a data URL
      const reader = new FileReader();
      
      reader.onloadend = () => {
        // Get the base64 string
        const base64String = reader.result as string;
        
        // Redirect to crop-img page with the encoded image
        router.push({
          pathname: '/crop-img',
          query: { image: base64String }
        });
      };
      
      // Read the file as a data URL
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error encoding image:', error);
    }
  };

  const handleUrlSubmit = async () => {
    if (imageUrl) {
      try {
        // For URLs, we'll encode them directly
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
          <div
            className="absolute right-0 top-0 text-[1.6rem] cursor-pointer"
            onClick={onClose}
          >
            <svg
              className="block"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path
                fill="#fff"
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              ></path>
            </svg>
          </div>
        </div>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative h-[27.8rem] border-2 ${
            dragging ? "border-blue-500" : "border-gray-900"
          } border-dashed rounded-lg p-6 text-center bg-gray-900 flex justify-center items-center flex-col`}
        >
          <div className="flex justify-center items-center ">
            {selectedFile ? (
              <div>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected File"
                  className="mx-auto mt-[-8rem]"
                />
                <p className="text-white">{selectedFile.name}</p>
              </div>
            ) : (
              <div className="flex justify-center items-center pb-[10rem]">
                <img
                  src="/images/uploadImg.svg"
                  alt="image icon"
                  className="w-24 mx-auto mr-8"
                />
                <p className="text-gray-600 text-[1.6rem]">
                  Drag an image here or
                  <label
                    htmlFor="file-upload"
                    className="text-blue-400 cursor-pointer text-[1.6rem] ml-2 hover:underline"
                  >
                    upload a file
                  </label>
                </p>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </div>
            )}
          </div>
          <div className="mb-[2rem] absolute bottom-0">
            <div className="my-4 text-sm text-gray-900 flex items-center justify-center">
              <hr className="w-[22rem]  my-8 bg-gray-800 border-1 border-gray-700 rounded dark:bg-gray-000" />
              <span className=" px-2 text-white ml-4 mr-4">OR</span>
              <hr className="w-[22rem] my-8 bg-gray-800 border-1 border-gray-700 rounded dark:bg-gray-000" />
            </div>
            <div className="flex items-center justify-between w-full space-x-4">
              <input
                type="text"
                placeholder="Paste image link"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-[40rem] h-[4.2rem] px-[2.4rem] border border-gray-800 bg-gray-800 text-white rounded-[2.4rem] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-[1.4rem]"
              />
              <button
                onClick={handleUrlSubmit}
                className="px-4 py-2 bg-gray-800 text-blue-400 font-[500] hover:bg-gray-700 w-[9.6rem] h-[4.2rem] rounded-[2.4rem] text-[1.4rem]"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleLensUpload;
