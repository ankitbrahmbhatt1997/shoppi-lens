import { useState, useEffect } from "react";
import GoogleLensUpload from "../GoogleLensUpload";
import ListeningModal from "../Listening-Modal";

// components/Search.tsx
export default function Search() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isGoogleLensOpen, setIsGoogleLensOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [suggestions, setSuggestions] = useState([
    "x empire episode youtube code",
    "Farooq Abdullah",
    "bengaluru man acid attack",
    "china stimulus package",
    "Emily in Paris",
    "aurora borealis northern lights",
  ]);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    // Optional: Add a small delay to keep suggestions visible briefly
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      // Show trending searches when input is focused but empty
      if (query.trim() === "" && isFocused) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&cx=${process.env.NEXT_PUBLIC_GOOGLE_CX}&q=trending`
          );
          const data = await response.json();
          setSuggestions(
            data.items.slice(0, 5).map((item: { title: string }) => item.title)
          );
        } catch (error) {
          console.error("Error fetching trending searches:", error);
        } finally {
          setIsLoading(false);
        }
        return;
      }

      // Handle normal search queries
      if (query.trim() !== "") {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://www.googleapis.com/customsearch/v1?key=${
              process.env.NEXT_PUBLIC_GOOGLE_API_KEY
            }&cx=${process.env.NEXT_PUBLIC_GOOGLE_CX}&q=${encodeURIComponent(
              query
            )}`
          );
          const data = await response.json();
          setSuggestions(
            data.items.slice(0, 5).map((item: { title: string }) => item.title)
          );
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, isFocused]);

  return (
    <main className="flex flex-col items-center justify-center flex-1 px-4 relative">
      <img
        src="/images/google.svg"
        alt="Google Logo"
        className="w-[27rem] mb-[3.5rem]"
      />
      <div
        className={`w-[582px] h-[48px] flex items-center bg-gray-800 rounded-[24px]  hover:bg-gray-700  relative ${
          query || isFocused
            ? "rounded-b-none border-b-0  hover:bg-gray-800  "
            : ""
        }`}
      >
        <div className="absolute left-6">
          <svg
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={"24"}
            height={"24"}
          >
            <path
              fill="#9aa0a6"
              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          className={` flex-1 bg-transparent text-gray-200 h-[48px] placeholder-gray-500 text-base focus:outline-none pt-[1px] pr-[87px] pb-[1px] pl-[52px] ${
            query || isFocused ? " border-gray-700 " : ""
          }`}
          placeholder="Search Google or type a URL"
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
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
        {(query || isFocused) && (
          <div className="absolute left-0 top-[47px] z-10 w-[100%] p-8 bg-gray-800 rounded-b-[24px] shadow-lg border-t-0 border-l border-r border-b border-gray-700 ">
            <h3 className="text-gray-400 text-[1.4rem] border-t-2  pt-4  border-gray-700 mt-[-20px]">
              {query ? "Search suggestions" : "Trending searches"}
            </h3>
            <div className="mt-2 space-y-2 text-white ">
              {!isLoading &&
                suggestions
                  .filter((suggestion) =>
                    query
                      ? suggestion.toLowerCase().includes(query.toLowerCase())
                      : true
                  )
                  .map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-2 rounded-lg text-[1.6rem]"
                    >
                      <div>🔍</div>
                      <div className="pl-4">{suggestion}</div>
                    </div>
                  ))}
            </div>
            <div className="mt-10 space-x-4  text-center">
              <button className="py-2 px-[1.6rem] bg-gray-700 text-gray-200 rounded-md text-[1.6rem] hover:shadow  hover:border hover:border-gray-600 ">
                Google Search
              </button>
              <button className="py-2 px-[1.6rem] bg-gray-700 text-gray-200 rounded-md text-[1.6rem] hover:shadow  hover:border hover:border-gray-600 ">
                I'm Feeling Lucky
              </button>
            </div>
          </div>
        )}
        {isGoogleLensOpen && (
          <GoogleLensUpload
            isOpen={isGoogleLensOpen}
            onClose={() => setIsGoogleLensOpen(false)}
          />
        )}
      </div>
      <div className="mt-10 space-x-4 mb-[2rem]">
        <button className="py-2 px-[1.6rem] bg-gray-700 text-gray-200 rounded-md text-[1.6rem] hover:shadow  hover:border hover:border-gray-600 ">
          Google Search
        </button>
        <button className="py-2 px-[1.6rem] bg-gray-700 text-gray-200 rounded-md text-[1.6rem] hover:shadow  hover:border hover:border-gray-600 ">
          I'm Feeling Lucky
        </button>
      </div>
      <div className="mt-2 text-center text-gray-200 text-[1.4rem]">
        Google offered in:
        <a href="#" className="hover:underline pr-3 pl-4 text-[#99c3ff]">
          हिन्दी
        </a>
        <a href="#" className="hover:underline  pr-3 text-[#99c3ff]">
          বাংলা
        </a>
        <a href="#" className="hover:underline pr-3 text-[#99c3ff]">
          తెలుగు
        </a>
        <a href="#" className="hover:underline pr-3 text-[#99c3ff]">
          मराठी
        </a>
        <a href="#" className="hover:underline pr-3 text-[#99c3ff]">
          தமிழ்
        </a>
        <a href="#" className="hover:underline pr-3 text-[#99c3ff]">
          ગુજરાતી
        </a>
        <a href="#" className="hover:underline pr-3 text-[#99c3ff]">
          ಕನ್ನಡ
        </a>
        <a href="#" className="hover:underline pr-3 text-[#99c3ff]">
          മലയാളം
        </a>
        <a href="#" className="hover:underline pr-3 text-[#99c3ff]">
          ਪੰਜਾਬੀ
        </a>
      </div>
      <ListeningModal
        isOpen={isListening}
        onClose={() => setIsListening(false)}
      />
    </main>
  );
}
