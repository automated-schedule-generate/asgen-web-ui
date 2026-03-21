'use server';

const api_url = process.env.API_URL ?? 'http://localhost:8000';

const env = {
  api_url,
};

export { env };
