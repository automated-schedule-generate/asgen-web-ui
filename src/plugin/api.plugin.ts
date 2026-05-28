'use server';

import axios from 'axios';
import { getCookie } from './cookie.plugin';
import { getEnv } from './env.plugin';

export async function getApi() {
  const api = axios.create({
    baseURL: (await getEnv()).api_url,
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    // adapter: createHTTP2Adapter(adapterConfig),
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
