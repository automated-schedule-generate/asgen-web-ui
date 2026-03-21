'use client';

import { useState, useEffect, useCallback } from 'react';
import { exampleService } from '../services/example.service';
import { IExample } from '../types/example.type';

/**
 * ESTE É UM HOOK DE EXEMPLO
 */
export function useExampleHook() {
  const [data, setData] = useState<IExample[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const res = await exampleService.getExamples();
      setData(res);
    } catch (error) {
      console.error('Error fetching examples:', error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading };
}
