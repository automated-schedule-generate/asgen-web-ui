'use server';

import axios from 'axios';
import { createHTTP2Adapter } from 'axios-http2-adapter';
import { getCookie } from './cookie.plugin';
import { env } from './env.plugin';

const api = axios.create({
  baseURL: env.api_url,
  headers: {
    'Content-Type': 'application/json',
  },
  adapter: createHTTP2Adapter(),
});

api.interceptors.request.use(async (config) => {
  const token = await getCookie('token');
  if (token.trim() !== '') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api };
