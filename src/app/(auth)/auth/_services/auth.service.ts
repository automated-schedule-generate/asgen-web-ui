'use server';
import { api } from '@/plugin/api.plugin';
import { AuthSchema } from '../_schemas/auth-schema.schema';
import { cookies } from 'next/headers';

export async function login(payload: AuthSchema) {
  try {
    const response = await api.post('/auth/login', payload);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
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
