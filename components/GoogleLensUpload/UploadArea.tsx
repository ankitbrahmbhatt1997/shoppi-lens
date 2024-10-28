import React, { useState } from 'react';

interface UploadAreaProps {
  selectedFile: File | null;
  onFileUpload: (file: File) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ selectedFile, onFileUpload }) => {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative h-[27.8rem] border-2 ${
        dragging ? "border-blue-500" : "border-gray-900"
      } border-dashed rounded-lg p-6 text-center bg-gray-900 flex justify-center items-center flex-col`}
    >
      <div className="flex justify-center items-center">
        {selectedFile ? (
          <SelectedFilePreview file={selectedFile} />
        ) : (
          <UploadPrompt onFileInput={handleFileInput} />
        )}
      </div>
    </div>
  );
};

const SelectedFilePreview: React.FC<{ file: File }> = ({ file }) => (
  <div>
    <img
      src={URL.createObjectURL(file)}
      alt="Selected File"
      className="mx-auto mt-[-8rem]"
    />
    <p className="text-white">{file.name}</p>
  </div>
);

const UploadPrompt: React.FC<{ onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ onFileInput }) => (
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
      onChange={onFileInput}
    />
  </div>
);

export default UploadArea;
