'use server';

export async function getEnv() {
  return {
    api_url: process.env.API_URL ?? 'https://localhost:8000',
  };
}
