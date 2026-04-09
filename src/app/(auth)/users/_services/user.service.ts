'use server';
import { getApi } from '@/plugin/api.plugin';
import { User } from '../_schemas/user.schema';
import { firstLetterUpperCase } from '@/utils/first-letter-uppercase.util';

export async function register(payload: User) {
  const api = await getApi();
  try {
    const response = await api.post('/user/register', {
      ...payload,
      name: `${firstLetterUpperCase(payload.name.trim())} ${firstLetterUpperCase(payload.surname.trim())}`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
