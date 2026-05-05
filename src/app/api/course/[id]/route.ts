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
    const response = await api.get(`/course/${params.id}`);
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error('Course proxy GET by id error:', error);
    const axiosError = error as AxiosErrorLike;
    const status = axiosError.response?.status ?? 500;
    const data = axiosError.response?.data ?? {
      message: axiosError.message ?? 'Internal server error',
    };
    return NextResponse.json(data, { status });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const api = await getApi();
    const response = await api.delete(`/course/${params.id}`);
    return NextResponse.json(response.data, { status: response.status ?? 200 });
  } catch (error: unknown) {
    const axiosError = error as AxiosErrorLike;
    const status = axiosError.response?.status ?? 500;
    const data = axiosError.response?.data ?? {
      message: axiosError.message ?? 'Internal server error',
    };

    console.error('Course proxy DELETE error:', {
      courseId: params.id,
      status,
      fullData: JSON.stringify(data),
      message: axiosError.message,
    });

    return NextResponse.json(data, { status });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const payload = await request.json();
    const api = await getApi();
    const response = await api.put(`/course/${params.id}`, payload);
    return NextResponse.json(response.data, { status: response.status ?? 200 });
  } catch (error: unknown) {
    console.error('Course proxy PUT error:', error);
    const axiosError = error as AxiosErrorLike;
    const status = axiosError.response?.status ?? 500;
    const data = axiosError.response?.data ?? {
      message: axiosError.message ?? 'Internal server error',
    };
    return NextResponse.json(data, { status });
  }
}
