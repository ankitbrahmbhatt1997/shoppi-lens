import React from 'react';

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  setIsListening: (isListening: boolean) => void;
  setIsGoogleLensOpen: (isOpen: boolean) => void;
}

export default function SearchInput({
  query,
  setQuery,
  onFocus,
  onBlur,
  setIsListening,
  setIsGoogleLensOpen,
}: SearchInputProps) {
  return (
    <>
      <div className="absolute left-6">
        <svg
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            fill="#9aa0a6"
            d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      </div>
      <input
        type="text"
        className={`flex-1 bg-transparent text-gray-200 h-[48px] placeholder-gray-500 text-base focus:outline-none pt-[1px] pr-[87px] pb-[1px] pl-[52px] ${
          query ? "border-gray-700" : ""
        }`}
        placeholder="Search Google or type a URL"
        onChange={(e) => setQuery(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        value={query}
      />
      <div className="flex space-x-6 ml-4 absolute right-8">
        <button
          className="text-gray-200 hover:text-white"
          onClick={() => setIsListening(true)}
        >
          <img src="/images/mic.svg" alt="mic Logo" />
        </button>
        <button
          className="text-gray-200 hover:text-white"
          onClick={() => setIsGoogleLensOpen(true)}
        >
          <img
            src="/images/camera.svg"
            alt="camera Logo"
            className="w-[2.5rem]"
          />
        </button>
      </div>
    </>
  );
}
