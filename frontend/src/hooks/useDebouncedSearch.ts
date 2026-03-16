/**
 * Custom hook for debounced search
 */

import { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';

interface UseDebouncedSearchReturn {
  searchTerm: string;
  debouncedSearchTerm: string;
  setSearchTerm: (term: string) => void;
  isSearching: boolean;
}

export const useDebouncedSearch = (
  callback?: (searchTerm: string) => void | Promise<void>,
  delay: number = 500
): UseDebouncedSearchReturn => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Create debounced function
  const debouncedCallback = useCallback(
    debounce(async (term: string) => {
      setDebouncedSearchTerm(term);
      if (callback) {
        setIsSearching(true);
        try {
          await callback(term);
        } finally {
          setIsSearching(false);
        }
      }
    }, delay),
    [callback, delay]
  );

  // Update debounced search term when search term changes
  useEffect(() => {
    debouncedCallback(searchTerm);
  }, [searchTerm, debouncedCallback]);

  return {
    searchTerm,
    debouncedSearchTerm,
    setSearchTerm,
    isSearching,
  };
};
