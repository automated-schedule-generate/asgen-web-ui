'use server';

import { getApi } from '@/plugin/api.plugin';
import type { CourseType } from '../_schemas/course.schema';
import {
  IResponseRequest,
  IResponseRequestPaginated,
} from '@/interfaces/response-request.interface';
import { CourseData } from '../_types/course.types';

export async function getAllCourses({
  page = 1,
  limit = 10,
  search = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
} = {}) {
  const api = await getApi();
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
  const api = await getApi();
  try {
    const { data } = await api.get(`/course/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createCourse(payload: CourseType) {
  const api = await getApi();
  try {
    const { data } = await api.post('/course', payload);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateCourse(id: string, payload: CourseType) {
  const api = await getApi();
  try {
    const { data } = await api.put(`/course/${id}`, payload);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteCourse(id: string) {
  const api = await getApi();
  try {
    const { data } = await api.delete(`/course/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCourseWithTimetable(
  filter_data: { semester_id?: string; course_id?: string } = {},
): Promise<CourseData[]> {
  const api = await getApi();
  try {
    const {
      data: { data },
    } = await api.get<IResponseRequestPaginated<CourseData>>(
      '/course/find-timetable',
      {
        params: {
          ...filter_data,
        },
      },
    );

    return data.items;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function generateTimetableAllCourses() {
  const api = await getApi();

  try {
    const { data } = await api.post<
      IResponseRequest<{ courses_amount: number }>
    >('/course/generate-timetable');

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
