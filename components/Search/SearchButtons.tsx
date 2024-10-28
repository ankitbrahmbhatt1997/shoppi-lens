import React from 'react';

interface SearchButtonsProps {
  className?: string;
}

export default function SearchButtons({ className = "mt-10 space-x-4 mb-[2rem]" }: SearchButtonsProps) {
  return (
    <div className={className}>
      <button className="py-2 px-[1.6rem] bg-gray-700 text-gray-200 rounded-md text-[1.6rem] hover:shadow hover:border hover:border-gray-600">
        Google Search
      </button>
      <button className="py-2 px-[1.6rem] bg-gray-700 text-gray-200 rounded-md text-[1.6rem] hover:shadow hover:border hover:border-gray-600">
        I'm Feeling Lucky
      </button>
    </div>
  );
}
