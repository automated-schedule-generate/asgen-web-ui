'use server';
import { getApi } from '@/plugin/api.plugin';
import { ClassType } from '../_schemas/class.schema';
const api = await getApi();

export async function getAllClasses({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) {
  try {
    const { data } = await api.get('/class', {
      params: {
        page,
        limit,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createClass(payload: ClassType) {
  try {
    const { data } = await api.post('/class', payload);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateClass(id: string, payload: ClassType) {
  try {
    const { data } = await api.put(`/class/${id}`, payload);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteClass(id: string) {
  try {
    const { data } = await api.delete(`/class/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
