export function getErrorMessageUtil(
  error: unknown,
  defaultErrorMessage?: string,
) {
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object') {
    const data = error as { error?: string; message?: string };
    if (typeof data.error === 'string') return data.error;
    if (typeof data.message === 'string') return data.message;
  }
  return defaultErrorMessage || 'Erro inesperado';
}
