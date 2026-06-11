'use server';
import { getApi } from '@/plugin/api.plugin';

export interface TeacherPreferencesPayload {
  preferences: {
    turn: string;
    preference: boolean[][];
  }[];
}

export interface TeacherPreferenceTime {
  id: string;
  preference_id: string;
  selected_time: string;
}

export interface TeacherPreferencesResponse {
  id: string;
  day: string;
  turn: string;
  teacherId: string;
  preferenceTimes?: TeacherPreferenceTime[];
}

export async function getTeacherPreferences(
  userId: string,
): Promise<TeacherPreferencesResponse[]> {
  try {
    const api = await getApi();
    const { data } = await api.get(`/preference/${userId}`);
    return data?.data?.items ?? data?.data ?? data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createTeacherPreferences(
  payload: TeacherPreferencesPayload,
) {
  try {
    const api = await getApi();
    const { data } = await api.put('/preference', payload);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
