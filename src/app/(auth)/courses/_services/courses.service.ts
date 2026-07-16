'use server';

import { getApi } from '@/plugin/api.plugin';
import type { CourseType } from '../_schemas/course.schema';
import {
  IResponseRequest,
  IResponseRequestPaginated,
} from '@/interfaces/response-request.interface';
import { CourseData } from '../_types/course.types';
import { TimetableEntry } from '../../timetable/types/timetable-entry.type';
import axios from 'axios';
import { IServerActionsReturning } from '@/interfaces/server-actions-returning.interface';
import { TimetableProgressEnum } from '../../timetable/enums/timetable-progress.enum';

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
    const { data } = await api.get<IResponseRequestPaginated<CourseData>>(
      '/course',
      {
        params: {
          with_pagination: true,
          page,
          limit,
          search,
        },
      },
    );
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

export async function getCourseWithTimetable(params?: {
  semester_id?: string;
  course_id?: string;
  course_semester?: string;
  teacher_id?: string;
}): Promise<IServerActionsReturning<CourseData[]>> {
  const api = await getApi();
  try {
    const {
      data: { data },
    } = await api.get<IResponseRequestPaginated<CourseData>>(
      '/course/find-timetable',
      {
        params,
      },
    );

    return {
      success: true,
      data: data.items,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const returnError = error?.response?.data || error?.message;

      return {
        success: false,
        error: returnError,
      };
    }
    return {
      success: false,
      error: new Error('Erro ao buscar a grade de horarios'),
    };
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

export async function updateTimetableEntry(
  id: string,
  updated: {
    day: string;
    slot_index: number;
    teacher_id: string;
  },
): Promise<IServerActionsReturning<IResponseRequest<TimetableEntry | null>>> {
  const api = await getApi();

  try {
    const { data } = await api.put<IResponseRequest<TimetableEntry | null>>(
      '/course/update-timetable-entry/' + id,
      updated,
    );

    return {
      success: true,
      data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error?.response?.data || error?.message,
      };
    }

    return {
      success: false,
      error: new Error('Não foi possivel atualizar a grade horaria'),
    };
  }
}

export async function findTimetableProgress(): Promise<
  IServerActionsReturning<{ status: TimetableProgressEnum }>
> {
  const api = await getApi();

  try {
    const { data } = await api.get<
      IResponseRequest<{ status: TimetableProgressEnum }>
    >('/course/timetable-progress');
    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error?.response?.data || error?.message,
      };
    }

    return {
      success: false,
      error: new Error(
        'Não foi possivel encontrar o progresso da grade horaria',
      ),
    };
  }
}
