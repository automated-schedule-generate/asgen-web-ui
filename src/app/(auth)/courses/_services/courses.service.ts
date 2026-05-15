'use server';
import { getApi } from '@/plugin/api.plugin';
import type { CourseType } from '../_schemas/course.schema';
const api = await getApi();

export async function getAllCourses({
  page = 1,
  limit = 10,
  search = '',
  // type = '', // Comentado para uso futuro
}: {
  page?: number;
  limit?: number;
  search?: string;
  // type?: string; // Comentado para uso futuro
} = {}) {
  try {
    const { data } = await api.get('/course', {
      params: {
        with_pagination: true,
        page,
        limit,
        search,
        // type: type || undefined, // Comentado para uso futuro
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSubjectsByCourse(course_id: string) {
  try {
    const { data } = await api.get('/subject', {
      params: { course_id },
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
