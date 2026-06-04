'use server';
import { getApi } from '@/plugin/api.plugin';
import { AuthType } from '../_schemas/auth-schema.schema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(payload: AuthType) {
  const api = await getApi();
  try {
    const response = await api.post('/auth/login', {
      ...payload,
      login: payload.email,
      login_type: 'email',
    });
    const cookieStore = await cookies();
    cookieStore.set('token', response.data.data.session.token);

    return response.data;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Falha ao fazer login';
    throw new Error(message);
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('token');

  redirect('/', 'replace');

  return { success: true };
}

export async function me() {
  const api = await getApi();
  try {
    const response = await api.get('/auth/me');
    return response.data.data;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
}
