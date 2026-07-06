'use server';
import { getApi } from '@/plugin/api.plugin';

export async function getAllSemesters({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
} = {}) {
  const api = await getApi();
  try {
    const { data } = await api.get('/semester', {
      params: {
        page,
        limit,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
