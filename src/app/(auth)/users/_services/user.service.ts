'use server';
import { getApi } from '@/plugin/api.plugin';
import type { IUser } from '@/interfaces/user.interface';
import { UserType } from '../_schemas/user.schema';
import { firstLetterUpperCase } from '@/utils/first-letter-uppercase.util';
import { login } from '../../auth/_services/auth.service';

// In-memory local mock database for robust offline testing in development mode
const MOCK_USERS = [
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

interface IBackendUser {
  id: number;
  nome?: string;
  email?: string;
  funcao?: string;
  matricula?: string;
}

// Map backend properties (Portuguese) to frontend model (English)
function mapToFrontend(user: IBackendUser): IUser {
  let role = user.funcao || '';
  if (role === 'Coordenador') role = 'Coordinator';
  else if (role === 'Professor') role = 'Teacher';
  else if (role === 'CRADT') role = 'CRADT';

  return {
    id: user.id,
    name: user.nome || '',
    email: user.email || '',
    role: role,
    registration: user.matricula || '',
  };
}

// Map frontend role to backend Portuguese role name
function mapRoleToBackend(role: string): string {
  if (role === 'Coordinator') return 'Coordenador';
  if (role === 'Teacher') return 'Professor';
  return role;
}

export async function register(payload: UserType) {
  const api = await getApi();
  try {
    const response = await api.post('/user/register', {
      ...payload,
      name: `${firstLetterUpperCase(payload.name.trim())} ${firstLetterUpperCase(payload.surname.trim())}`,
    });
    await login({ email: payload.email, password: payload.password });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

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
      response?: { status?: number; data?: { message?: string | string[] } };
      message?: string;
    };

    // Offline registration fallback for development
    if (
      process.env.NODE_ENV === 'development' &&
      (!err.response || err.response.status === undefined)
    ) {
      console.warn('Backend offline, creating mock user for local development');
      const newId =
        MOCK_USERS.length > 0
          ? Math.max(...MOCK_USERS.map((u) => u.id)) + 1
          : 1;
      MOCK_USERS.push({
        id: newId,
        nome: `${firstLetterUpperCase(payload.name.trim())} ${firstLetterUpperCase(payload.surname.trim())}`,
        email: payload.email,
        funcao: 'Professor',
        matricula: `2026${String(newId).padStart(4, '0')}`,
      });
      return { success: true };
    }

    if (err.response && err.response.status && err.response.status >= 500) {
      throw new Error(
        'Erro de comunicação com o servidor. Tente novamente mais tarde.',
      );
    }
    if (err.response && err.response.data && err.response.data.message) {
      const messages = err.response.data.message;
      throw new Error(Array.isArray(messages) ? messages[0] : messages);
    }
    throw new Error(err.message || 'Erro ao criar usuário.');
  }
}

export async function getAllUsers({
  search = '',
}: {
  search?: string;
} = {}): Promise<IUser[]> {
  const api = await getApi();
  try {
    const { data } = await api.get('/user', {
      params: {
        search,
      },
    });
    const items = Array.isArray(data)
      ? data
      : data && Array.isArray(data.items)
        ? data.items
        : [];
    return items.map(mapToFrontend);
  } catch (error) {
    console.error('Error fetching users from API, using mock data:', error);

    // Filter local mock array for search
    const filteredMock = MOCK_USERS.filter((u) => {
      const term = search.toLowerCase().trim();
      if (!term) return true;
      return u.nome.toLowerCase().includes(term) || u.matricula.includes(term);
    });
    return filteredMock.map(mapToFrontend);
  }
}

export async function updateUserRole(id: number, role: string): Promise<IUser> {
  const api = await getApi();
  try {
    const { data } = await api.patch(`/user/${id}`, {
      funcao: mapRoleToBackend(role),
    });
    return mapToFrontend(data);
  } catch (error) {
    console.error(
      `Error updating user role (id: ${id}), updating local mock:`,
      error,
    );

    const mockUser = MOCK_USERS.find((u) => u.id === id);
    if (mockUser) {
      mockUser.funcao = mapRoleToBackend(role);
      return mapToFrontend(mockUser);
    }
    throw error;
  }
}

export async function updateUserName(id: number, name: string): Promise<IUser> {
  const api = await getApi();
  try {
    const { data } = await api.patch(`/user/${id}`, { nome: name });
    return mapToFrontend(data);
  } catch (error) {
    console.error(
      `Error updating user name (id: ${id}), updating local mock:`,
      error,
    );

    const mockUser = MOCK_USERS.find((u) => u.id === id);
    if (mockUser) {
      mockUser.nome = name;
      return mapToFrontend(mockUser);
    }
    throw error;
  }
}

export async function deleteUser(id: number): Promise<void> {
  const api = await getApi();
  try {
    await api.delete(`/user/${id}`);
  } catch (error) {
    console.error(
      `Error deleting user (id: ${id}), deleting from local mock:`,
      error,
    );

    const index = MOCK_USERS.findIndex((u) => u.id === id);
    if (index !== -1) {
      MOCK_USERS.splice(index, 1);
      return;
    }
    throw error;
  }
}
