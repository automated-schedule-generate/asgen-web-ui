'use server';

import axios from 'axios';
import { getCookie } from './cookie.plugin';
import { getEnv } from './env.plugin';
import http2 from 'http2-wrapper';
import { createHTTP2Adapter } from 'axios-http2-adapter';

const adapterConfig = createHTTP2Adapter({
  agent: new http2.Agent({/* options */}),
  force: false,
});

export async function getApi() {
  const { api_url } = await getEnv();

  const api = axios.create({
    baseURL: api_url,
    adapter: adapterConfig,
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
