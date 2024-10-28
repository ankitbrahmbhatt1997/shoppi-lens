import React from 'react';

interface UrlInputProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  onSubmit: () => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ imageUrl, setImageUrl, onSubmit }) => {
  return (
    <div className="mb-[2rem]">
      <div className="my-4 text-sm text-gray-900 flex items-center justify-center">
        <hr className="w-[22rem] my-8 bg-gray-800 border-1 border-gray-700 rounded dark:bg-gray-000" />
        <span className="px-2 text-white ml-4 mr-4">OR</span>
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
          onClick={onSubmit}
          className="px-4 py-2 bg-gray-800 text-blue-400 font-[500] hover:bg-gray-700 w-[9.6rem] h-[4.2rem] rounded-[2.4rem] text-[1.4rem]"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default UrlInput;
