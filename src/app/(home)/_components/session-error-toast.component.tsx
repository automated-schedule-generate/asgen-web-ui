'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

export function SessionErrorToast() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    if (error === 'user-fetch') {
      toast.error('Sua sessão expirou. Faça login novamente.');
      // Limpa o parâmetro da URL para o toast não reaparecer ao recarregar.
      router.replace('/');
    }
  }, [error, router]);

  return null;
}
