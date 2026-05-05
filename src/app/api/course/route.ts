'use server';

import { NextResponse } from 'next/server';
import { getApi } from '@/plugin/api.plugin';

type AxiosErrorLike = {
  response?: { status?: number; data?: unknown };
  message?: string;
};

export async function GET() {
  try {
    const api = await getApi();
    const response = await api.get('/course');
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error('Course proxy GET error:', error);
    const axiosError = error as AxiosErrorLike;
    const status = axiosError.response?.status ?? 500;
    const data = axiosError.response?.data ?? {
      message: axiosError.message ?? 'Internal server error',
    };
    return NextResponse.json(data, { status });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const api = await getApi();
    const response = await api.post('/course', payload);
    return NextResponse.json(response.data, { status: response.status ?? 200 });
  } catch (error: unknown) {
    console.error('Course proxy POST error:', error);
    const axiosError = error as AxiosErrorLike;
    const status = axiosError.response?.status ?? 500;
    const data = axiosError.response?.data ?? {
      message: axiosError.message ?? 'Internal server error',
    };
    return NextResponse.json(data, { status });
  }
}
