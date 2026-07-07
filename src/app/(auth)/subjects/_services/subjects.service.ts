'use server';
import { getApi } from '@/plugin/api.plugin';
import type { SubjectType } from '../_schemas/subject.schema';

export async function createSubject(payload: SubjectType) {
  const api = await getApi();
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
  const api = await getApi();
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
  const api = await getApi();
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
  const api = await getApi();
  try {
    const { data } = await api.get(`/subject/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteSubject(id: string) {
  const api = await getApi();
  try {
    await api.delete(`/subject/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function addSubjectTeacher({
  subject_id,
  teacher_id,
  semester_id,
}: {
  subject_id: string;
  teacher_id: string;
  semester_id: string;
}) {
  const api = await getApi();
  try {
    const { data } = await api.post(
      `/subject/${subject_id}/add-teacher-and-semester`,
      { teacher_id, semester_id },
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function unlinkSubject(
  subject_id: string,
  payload: { teacher_id: string; semester_id: string },
) {
  try {
    // O adapter HTTP/2 (http2-wrapper) proíbe body em DELETE por padrão do Node;
    // essa rota exige body, então forçamos o adapter HTTP/1.1 só nesta chamada.
    const { data } = await api.delete(
      `/subject/${subject_id}/delete-teacher-and-semester`,
      { data: payload, adapter: 'http' },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      throw new Error('Não foi possível remover o professor da disciplina');
    }
    throw error;
  }
}
