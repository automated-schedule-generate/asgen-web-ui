'use server';
import { getApi } from '@/plugin/api.plugin';
import type { SubjectSchema } from '../_schemas/subject.schema';
const api = await getApi();

export async function createSubject(payload: SubjectSchema) {
  try {
    const { data } = await api.post('/subject', payload);
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

export async function getAllSubjects() {
  try {
    const { data } = await api.get('/subject');
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

export async function getAllSubjectsByCourse(couse_id: string) {
  try {
    const { data } = await api.get(`/subject/course/${couse_id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getAllSubjectsByPrerequisite(prerequisite_id: string) {
  try {
    const { data } = await api.get(`/subject/prerequisite/${prerequisite_id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
