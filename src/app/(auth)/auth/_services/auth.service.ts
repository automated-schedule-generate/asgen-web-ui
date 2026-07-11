'use server';
import axios from 'axios';
import { getApi } from '@/plugin/api.plugin';
import { AuthType } from '../_schemas/auth-schema.schema';
import { redirect } from 'next/navigation';
import { deleteCookie, setCookie } from '@/plugin/cookie.plugin';

export async function login(payload: AuthType) {
  const api = await getApi();
  try {
    const response = await api.post('/auth/login', {
      ...payload,
      login: payload.email,
      login_type: 'email',
    });
    await setCookie('token', response.data.data.session.token);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? 'Falha ao fazer login');
    }
    throw new Error('Falha ao fazer login');
  }
}

export async function logout() {
  await deleteCookie('token');

  redirect('/', 'replace');

  return { success: true };
}

export async function me() {
  const api = await getApi();
  try {
    const response = await api.get('/auth/me');
    const user = response.data.data;

    // Map backend properties (Portuguese) to frontend context model (English)
    let role = user.funcao || '';
    if (role === 'Coordenador') role = 'Coordinator';
    else if (role === 'Professor') role = 'Teacher';
    else if (role === 'CRADT') role = 'CRADT';

    return {
      ...user,
      role: role,
    };
  } catch (error) {
    console.warn('Get current user error:', error);
    throw error;
  }
}
