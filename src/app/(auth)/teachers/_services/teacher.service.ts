'use server';
import { getApi } from '@/plugin/api.plugin';
import { TeacherType } from '../_schemas/teacher.schema';
const api = await getApi();

export async function getTeachers() {
  try {
    const { data } = await api.get('/teacher');
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createTeacher(payload: TeacherType) {
  try {
    const { data } = await api.post('/teacher', payload);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateTeacher(id: string, payload: TeacherType) {
  try {
    const { data } = await api.put(`/teacher/${id}`, payload);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteTeacher(id: string) {
  try {
    const { data } = await api.delete(`/teacher/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
