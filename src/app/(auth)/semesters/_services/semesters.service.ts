'use server';
import { getApi } from '@/plugin/api.plugin';
const api = await getApi();

export async function getAllSemesters({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
} = {}) {
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
