'use server';
import { getApi } from '@/plugin/api.plugin';
import type { IUser } from '@/interfaces/user.interface';

export async function getAllUsers(): Promise<IUser[]> {
  const api = await getApi();
  try {
    const { data } = await api.get('/user');
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.items)) return data.items;
    return [];
  } catch (error) {
    console.error('Error fetching users from API, using mock data:', error);
    return [
      {
        id: 1,
        nome: 'Guilherme Rodrigues',
        email: 'guilherme@asgen.com',
        funcao: 'Coordenador',
        matricula: '20260001',
      },
      {
        id: 2,
        nome: 'Joana Gomes',
        email: 'joana@asgen.com',
        funcao: 'Professor',
        matricula: '20260002',
      },
      {
        id: 3,
        nome: 'Claudiane Rodrigues',
        email: 'claudiane@asgen.com',
        funcao: 'Professor',
        matricula: '20260003',
      },
      {
        id: 4,
        nome: 'Maria Souza',
        email: 'maria@asgen.com',
        funcao: 'CRADT',
        matricula: '20260004',
      },
      {
        id: 5,
        nome: 'Pedro Alencar',
        email: 'pedro@asgen.com',
        funcao: 'Coordenador',
        matricula: '20260005',
      },
    ];
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
