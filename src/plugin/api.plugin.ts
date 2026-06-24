'use server';

import axios from 'axios';
import { getCookie } from './cookie.plugin';
import { getEnv } from './env.plugin';
import http2 from 'http2-wrapper';
import { createHTTP2Adapter } from 'axios-http2-adapter';

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const adapterConfig = {
  agent: new http2.Agent({
    /* options */
  }),
  force: true,
};

export async function getApi() {
  const apiUrl = (await getEnv()).api_url;
  const isHttps = apiUrl.startsWith('https://');

  const api = axios.create({
    baseURL: apiUrl,
    ...(isHttps ? { adapter: createHTTP2Adapter(adapterConfig) } : {}),
  });

  api.interceptors.request.use(async (config) => {
    const token = await getCookie('token');
    if (token.trim() !== '') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  return api;
}
