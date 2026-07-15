'use server';
import { IResponseRequestPaginated } from '@/interfaces/response-request.interface';
import { getApi } from '@/plugin/api.plugin';
import { Semester } from '../_interfaces/semester.interface';

export async function getAllSemesters({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
} = {}) {
  const api = await getApi();
  try {
    const { data } = await api.get<IResponseRequestPaginated<Semester>>(
      '/semester',
      {
        params: {
          page,
          limit,
        },
      },
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
