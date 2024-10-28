import { useState, useEffect } from 'react';

export function useSuggestions(query: string, isFocused: boolean) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
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

      if (query.trim() !== "") {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&cx=${process.env.NEXT_PUBLIC_GOOGLE_CX}&q=${encodeURIComponent(query)}`
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

  return { suggestions, isLoading };
}
