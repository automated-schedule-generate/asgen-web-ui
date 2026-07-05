'use server';

const api_url = process.env.API_URL ?? 'http://localhost:8000';

export async function getEnv() {
  return {
    api_url,
  };
}
