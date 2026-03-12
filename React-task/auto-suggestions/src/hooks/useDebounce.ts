import { useState, useEffect } from "react";

const useDebounce = <T>(value: T, delay: number = 2000): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(id);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;