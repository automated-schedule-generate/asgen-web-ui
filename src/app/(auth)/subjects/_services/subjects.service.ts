'use server';
import { getApi } from '@/plugin/api.plugin';
import type { SubjectType } from '../_schemas/subject.schema';
const api = await getApi();

export async function createSubject(payload: SubjectType) {
  try {
    if (!payload.prerequisite_id) {
      delete payload.prerequisite_id;
    }
    const { data } = await api.post('/subject', payload);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateSubject(id: string, payload: SubjectType) {
  try {
    if (!payload.prerequisite_id) {
      payload.prerequisite_id = null;
    }
    const { data } = await api.put(`/subject/${id}`, payload);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// export async function createGeneralSubjects(subject: any) {
//   try {
//     const { data } = await api.post('/subject/general', subject);
//     return data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

export async function getAllSubjects({
  page = 1,
  limit = 10,
  search,
  with_course = true,
  with_pagination = true,
  with_prerequisite = true,
  course_id,
}: {
  page?: number;
  limit?: number;
  search?: string;
  with_course?: boolean;
  with_pagination?: boolean;
  with_prerequisite?: boolean;
  course_id?: string;
} = {}) {
  try {
    const { data } = await api.get('/subject', {
      params: {
        with_course,
        with_pagination,
        page,
        limit,
        search,
        course_id,
        with_prerequisite,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSubjectById(id: string) {
  try {
    const { data } = await api.get(`/subject/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteSubject(id: string) {
  try {
    await api.delete(`/subject/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
