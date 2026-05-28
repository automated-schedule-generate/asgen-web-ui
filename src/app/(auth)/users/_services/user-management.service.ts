'use server';
import { getApi } from '@/plugin/api.plugin';
import type { IUser } from '@/interfaces/user.interface';
import { UserType } from '../_schemas/user.schema';
import { firstLetterUpperCase } from '@/utils/first-letter-uppercase.util';

export async function createUser(payload: UserType) {
  const api = await getApi();
  try {
    const { data } = await api.post('/user/register', {
      ...payload,
      name: `${firstLetterUpperCase(payload.name.trim())} ${firstLetterUpperCase(payload.surname.trim())}`,
    });
    return data;
  } catch (error: unknown) {
    const err = error as {
      response?: { data?: { message?: string | string[] } };
      message?: string;
    };
    if (err.response && err.response.data && err.response.data.message) {
      const messages = err.response.data.message;
      throw new Error(Array.isArray(messages) ? messages[0] : messages);
    }
    throw new Error(err.message || 'Erro ao criar usuário');
  }
}

export async function getAllUsers(): Promise<IUser[]> {
  const api = await getApi();
  try {
    const { data } = await api.get('/user');
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.items)) return data.items;
    return [];
  } catch (error) {
    console.error('Error fetching users from API:', error);
    throw error;
  }
}

export async function updateUserRole(
  id: number,
  funcao: string,
): Promise<IUser> {
  const api = await getApi();
  const { data } = await api.patch(`/user/${id}`, { funcao });
  return data;
}

export async function updateUserName(id: number, nome: string): Promise<IUser> {
  const api = await getApi();
  const { data } = await api.patch(`/user/${id}`, { nome });
  return data;
}

export async function deleteUser(id: number): Promise<void> {
  const api = await getApi();
  await api.delete(`/user/${id}`);
}
