'use server';
import { getApi } from '@/plugin/api.plugin';
import { TeacherType } from '../_schemas/teacher.schema';
import { PreferencesFormType } from '../_schemas/preferences-form.schema';

export async function getTeachers({
  page = 1,
  limit = 10,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
} = {}) {
  try {
    const api = await getApi();
    const { data } = await api.get('/teacher', {
      params: { page, limit, search },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTeacherById(id: string) {
  try {
    const api = await getApi();
    const { data } = await api.get(`/teacher/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createTeacher(payload: TeacherType) {
  try {
    const api = await getApi();
    const { data } = await api.post('/teacher', payload);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateTeacher(payload: PreferencesFormType) {
  try {
    const api = await getApi();
    const { data } = await api.put('/teacher', payload);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteTeacher(id: string) {
  try {
    const api = await getApi();
    const { data } = await api.delete(`/teacher/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
