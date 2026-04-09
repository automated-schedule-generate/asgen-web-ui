'use server';

const api_url = process.env.API_URL ?? 'https://localhost:8000';

const env = {
  api_url,
};

export async function getEnv() {
  return env;
}
