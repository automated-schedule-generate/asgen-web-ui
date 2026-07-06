'use server';
import { getApi } from '@/plugin/api.plugin';
import { ClassType } from '../_schemas/class.schema';

export async function getAllClasses({
  page = 1,
  limit = 10,
  search = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const api = await getApi();
  try {
    const { data } = await api.get('/class', {
      params: {
        page,
        limit,
        search,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createClass(payload: ClassType) {
  const api = await getApi();
  try {
    const { data } = await api.post('/class', payload);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateClass(id: string, payload: ClassType) {
  const api = await getApi();
  try {
    const { data } = await api.put(`/class/${id}`, payload);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getClassById(id: string) {
  const api = await getApi();
  try {
    const { data } = await api.get('/class', { params: { limit: 1000 } });
    const items = data?.data?.items ?? [];
    const classe = items.find((c: { id: string }) => c.id === id) ?? null;
    return { data: classe };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteClass(id: string) {
  const api = await getApi();
  try {
    const { data } = await api.delete(`/class/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
