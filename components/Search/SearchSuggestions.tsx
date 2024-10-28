import React from 'react';
import SearchButtons from './SearchButtons';

interface SearchSuggestionsProps {
  query: string;
  suggestions: string[];
  isLoading: boolean;
}

export default function SearchSuggestions({
  query,
  suggestions,
  isLoading,
}: SearchSuggestionsProps) {
  return (
    <div className="absolute left-0 top-[47px] z-10 w-[100%] p-8 bg-gray-800 rounded-b-[24px] shadow-lg border-t-0 border-l border-r border-b border-gray-700">
      <h3 className="text-gray-400 text-[1.4rem] border-t-2 pt-4 border-gray-700 mt-[-20px]">
        {query ? "Search suggestions" : "Trending searches"}
      </h3>
      <div className="mt-2 space-y-2 text-white">
        {!isLoading &&
          suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-2 rounded-lg text-[1.6rem]"
            >
              <div>🔍</div>
              <div className="pl-4">{suggestion}</div>
            </div>
          ))}
      </div>
      <SearchButtons className="mt-10 text-center" />
    </div>
  );
}
