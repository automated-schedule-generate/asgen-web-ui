'use server';

import { getApi } from '@/plugin/api.plugin';
import type { CourseType } from '../_schemas/course.schema';

const api = await getApi();

export async function getAllCourses({
  page = 1,
  limit = 10,
  search = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
} = {}) {
  try {
    const { data } = await api.get('/course', {
      params: {
        with_pagination: true,
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
