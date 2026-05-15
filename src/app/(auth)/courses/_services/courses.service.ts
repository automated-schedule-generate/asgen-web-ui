'use server';
import { getApi } from '@/plugin/api.plugin';
import type { CourseType } from '../_schemas/course.schema';
const api = await getApi();

export async function getAllCourses(filters?: {
  search?: string;
  type?: string;
}) {
  try {
    const { data } = await api.get('/course', {
      params: { search: filters?.search, type: filters?.type },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCourseById(id: string) {
  try {
    const { data } = await api.get(`/course/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createCourse(payload: CourseType) {
  try {
    const { data } = await api.post('/course', payload);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateCourse(id: string, payload: CourseType) {
  try {
    const { data } = await api.put(`/course/${id}`, payload);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteCourse(id: string) {
  try {
    const { data } = await api.delete(`/course/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
