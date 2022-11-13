import init from 'breath';

import {useEffect, useState} from 'react';

export const useWasm = () => {
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchWasm = async () => {
      try {
        await init();
      } catch (err: unknown) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWasm();
  }, []);
  return {error, isLoading};
};
