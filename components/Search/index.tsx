import React, { useState } from "react";
import GoogleLensUpload from "../GoogleLensUpload";
import ListeningModal from "../Listening-Modal";
import SearchInput from "./SearchInput";
import SearchSuggestions from "./SearchSuggestions";
import SearchButtons from "./SearchButtons";
import LanguageOptions from "./LanguageOptions";
import { useSuggestions } from "@/hooks/useSuggestions";

export default function Search() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isGoogleLensOpen, setIsGoogleLensOpen] = useState(false);

  const { suggestions, isLoading } = useSuggestions(query, isFocused);

  const handleInputFocus = () => setIsFocused(true);
  const handleInputBlur = () => {
    setTimeout(() => setIsFocused(false), 200);
  };

  return (
    <main className="flex flex-col items-center justify-center flex-1 px-4 relative">
      <img
        src="/images/google.svg"
        alt="Google Logo"
        className="w-[27rem] mb-[3.5rem]"
      />
      
      <div
        className={`w-[582px] h-[48px] flex items-center bg-gray-800 rounded-[24px] hover:bg-gray-700 relative ${
          (query || isFocused) ? "rounded-b-none border-b-0 hover:bg-gray-800" : ""
        }`}
      >
        <SearchInput
          query={query}
          setQuery={setQuery}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          setIsListening={setIsListening}
          setIsGoogleLensOpen={setIsGoogleLensOpen}
        />

        {(query || isFocused) && (
          <SearchSuggestions
            query={query}
            suggestions={suggestions}
            isLoading={isLoading}
          />
        )}

        {isGoogleLensOpen && (
          <GoogleLensUpload
            isOpen={isGoogleLensOpen}
            onClose={() => setIsGoogleLensOpen(false)}
          />
        )}
      </div>

      <SearchButtons />
      <LanguageOptions />
      
      <ListeningModal
        isOpen={isListening}
        onClose={() => setIsListening(false)}
      />
    </main>
  );
}
