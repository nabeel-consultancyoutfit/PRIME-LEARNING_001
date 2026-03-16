/**
 * Custom hook for managing modal state
 */

import { useState, useCallback } from 'react';

interface UseModalStateReturn<T = any> {
  isOpen: boolean;
  data: T | null;
  open: (data?: T) => void;
  close: () => void;
  setData: (data: T) => void;
}

export const useModalState = <T = any>(): UseModalStateReturn<T> => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setDataState] = useState<T | null>(null);

  const open = useCallback((newData?: T) => {
    if (newData !== undefined) {
      setDataState(newData);
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Optional: clear data on close
    // setDataState(null);
  }, []);

  const setData = useCallback((newData: T) => {
    setDataState(newData);
  }, []);

  return {
    isOpen,
    data,
    open,
    close,
    setData,
  };
};
