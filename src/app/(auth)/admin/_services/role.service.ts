'use server';
import { getApi } from '@/plugin/api.plugin';
import type { RoleType } from '../_schemas/role.schema';
const api = await getApi();

// In-memory mock database for when the API is offline
let mockRoles: RoleType[] = [
  {
    id: 'role-den-001',
    name: 'DEN',
    description:
      'Direção de Ensino - Responsável por planejar, coordenar e supervisionar as atividades e políticas de ensino da instituição.',
    created_at: new Date().toISOString(),
  },
  {
    id: 'role-cradt-002',
    name: 'CRADT',
    description:
      'Coordenação de Registros Acadêmicos, Diplomas e Transferências - Gerencia o registro escolar, histórico e a vida acadêmica dos estudantes.',
    created_at: new Date().toISOString(),
  },
  {
    id: 'role-coord-003',
    name: 'Coordenador de Curso',
    description:
      'Gestão pedagógica integrada, acompanhamento contínuo do currículo e suporte direto aos professores e alunos.',
    created_at: new Date().toISOString(),
  },
  {
    id: 'role-prof-004',
    name: 'Professor',
    description:
      'Responsável por ministrar aulas, avaliar o desempenho dos alunos e participar do planejamento pedagógico.',
    created_at: new Date().toISOString(),
  },
];

export async function getAllRoles() {
  try {
    const { data } = await api.get('/role');
    return data;
  } catch (error) {
    console.log('API offline. Using mock data for presentation.');
    return {
      data: {
        items: [...mockRoles].reverse(), // Show newest first
      },
    };
  }
}

export async function getRoleById(id: string) {
  try {
    const { data } = await api.get(`/role/${id}`);
    return data;
  } catch (error) {
    const role = mockRoles.find((r) => r.id === id);
    if (role) return { data: role };
    throw new Error('Cargo não encontrado');
  }
}

export async function createRole(payload: Omit<RoleType, 'id'>) {
  try {
    const { data } = await api.post('/role', payload);
    return data;
  } catch (error) {
    const newRole: RoleType = {
      ...payload,
      id: `role-mock-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockRoles.push(newRole);
    return { data: newRole };
  }
}

export async function updateRole(id: string, payload: Omit<RoleType, 'id'>) {
  try {
    const { data } = await api.put(`/role/${id}`, payload);
    return data;
  } catch (error) {
    const index = mockRoles.findIndex((r) => r.id === id);
    if (index !== -1) {
      mockRoles[index] = {
        ...mockRoles[index],
        ...payload,
        updated_at: new Date().toISOString(),
      };
      return { data: mockRoles[index] };
    }
    throw new Error('Cargo não encontrado para atualizar');
  }
}

export async function deleteRole(id: string) {
  try {
    const { data } = await api.delete(`/role/${id}`);
    return data;
  } catch (error) {
    mockRoles = mockRoles.filter((r) => r.id !== id);
    return { success: true };
  }
}
