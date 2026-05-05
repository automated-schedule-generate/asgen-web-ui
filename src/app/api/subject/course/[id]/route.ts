'use server';

import { NextResponse } from 'next/server';
import { getApi } from '@/plugin/api.plugin';

type AxiosErrorLike = {
  response?: { status?: number; data?: unknown };
  message?: string;
};

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const api = await getApi();
    const response = await api.get(`/subject/course/${params.id}`);
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error('Subject by course proxy GET error:', error);
    const axiosError = error as AxiosErrorLike;
    const status = axiosError.response?.status ?? 500;
    const data = axiosError.response?.data ?? {
      message: axiosError.message ?? 'Internal server error',
    };
    return NextResponse.json(data, { status });
  }
}
