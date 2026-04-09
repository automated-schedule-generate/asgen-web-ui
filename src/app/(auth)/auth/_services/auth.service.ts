'use server';
import { getApi } from '@/plugin/api.plugin';
import { AuthSchema } from '../_schemas/auth-schema.schema';
import { cookies } from 'next/headers';

export async function login(payload: AuthSchema) {
  console.log('Login payload:', payload);
  const api = await getApi();
  try {
    const response = await api.post('/auth/login', {
      ...payload,
      login: payload.email,
      login_type: 'email',
    });
    return response.data;
  } catch (error) {
    console.log('Login error:', error);
    throw error;
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('token');

  return { success: true };
}

// export async function me() {
//   try {
//     const response = await api.get('/auth/me');
//     return response.data;
//   } catch (error) {
//     console.error('Get current user error:', error);
//     throw error;
//   }
// };
