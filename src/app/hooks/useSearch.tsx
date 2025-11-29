import { useState, useEffect } from "react";

export default function useSearch() {
  const [searchQuery, setSearchQuery] = useState("  ");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 900);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  return { searchQuery, setSearchQuery, debouncedQuery };
}
