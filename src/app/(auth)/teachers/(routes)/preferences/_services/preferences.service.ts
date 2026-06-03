'use server';
import { getApi } from '@/plugin/api.plugin';

export interface TeacherPreferencesPayload {
  preferences: {
    turn: string;
    preference: boolean[][];
  }[];
}

export async function createTeacherPreferences(
  payload: TeacherPreferencesPayload,
) {
  try {
    const api = await getApi();
    const { data } = await api.post('/preference', payload);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
