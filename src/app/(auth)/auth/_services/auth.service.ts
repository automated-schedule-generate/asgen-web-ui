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
  } catch (error) {
    console.log('Login error:', error);
    throw error;
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
    const user = response.data.data;

    // Map backend properties (Portuguese) to frontend context model (English)
    let role = user.funcao || '';
    if (role === 'Coordenador') role = 'Coordinator';
    else if (role === 'Professor') role = 'Teacher';
    else if (role === 'CRADT') role = 'CRADT';

    return {
      id: user.id,
      name: user.nome || '',
      email: user.email || '',
      role: role,
    };
  } catch (error) {
    console.error('Get current user error:', error);
    if (process.env.NODE_ENV === 'development') {
      // Fallback user for local development when backend is offline
      return {
        id: 1,
        name: 'Administrador Local',
        email: 'admin@asgen.com',
        role: 'Coordinator',
      };
    }
    throw error;
  }
}
