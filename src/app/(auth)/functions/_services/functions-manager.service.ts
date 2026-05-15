'use server';
import { getApi } from '@/plugin/api.plugin';
import type { IUser } from '@/interfaces/user.interface';

export async function getAllUsers(): Promise<IUser[]> {
  const api = await getApi();
  const { data } = await api.get('/user');
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.items)) return data.items;
  return [];
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
