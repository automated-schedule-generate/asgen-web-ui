'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';

import {
  courseSchema,
  CourseType,
} from '@/app/(auth)/courses/_schemas/course.schema';
import { CourseForm } from '@/app/(auth)/courses/_components/course-form.component';
import {
  updateCourse,
  getAllCourses,
} from '@/app/(auth)/courses/_services/courses.service';
import { CourseData } from '@/app/(auth)/courses/_types/course.types';

export default function EditCoursePage() {
  const router = useRouter();
  const { id } = useParams();
  const [loadingData, setLoadingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const formMethods = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: '',
      class_time: '45',
      total_semesters: 1,
    },
  });

  const loadCourseData = useCallback(async () => {
    if (!id) return;
    setLoadingData(true);
    try {
      const res = await getAllCourses({ page: 1, limit: 100 });
      const list = res?.data?.items || res?.items || res?.data || res || [];
      const currentCourse = Array.isArray(list)
        ? list.find((c: CourseData) => c.id === id)
        : null;

      if (currentCourse) {
        formMethods.reset({
          name: currentCourse.name,
          class_time: String(currentCourse.class_time) as '45' | '60',
          total_semesters: Number(currentCourse.total_semesters),
        });
      } else {
        console.error('Curso não mapeado no banco local.');
        router.push('/courses');
      }
    } catch (error) {
      console.error('Erro na requisição dos dados do curso:', error);
    } finally {
      setLoadingData(false);
    }
  }, [id, formMethods, router]);

  useEffect(() => {
    loadCourseData();
  }, [loadCourseData]);

  const handleEditSubmit = async (data: FieldValues) => {
    if (!id) return;
    setSubmitting(true);
    try {
      await updateCourse(id as string, data as unknown as CourseType);
      router.push('/courses');
      router.refresh();
    } catch (error) {
      console.error('Erro ao processar atualização:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress size={50} sx={{ color: '#0B0A7A' }} />
      </Box>
    );
  }

  return (
    <ContentLayoutComponent
      title="Editar Curso"
      description="Modifique as informações gerais do curso selecionado."
      hasPagination={false}
    >
      <Box sx={{ width: '100%', mt: 1 }}>
        <Box sx={{ maxWidth: 'md', width: '100%' }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, color: '#0B0A7A', mb: 3 }}
          >
            INFORMAÇÕES DO CURSO
          </Typography>

          <CourseForm
            formMethods={formMethods}
            onSubmit={formMethods.handleSubmit(handleEditSubmit)}
          >
            <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2, mt: 4 }}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => router.push('/courses')}
                disabled={submitting}
                sx={{
                  borderRadius: '50px',
                  px: 3,
                  fontWeight: 700,
                  textTransform: 'none',
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={submitting}
                sx={{
                  bgcolor: '#0B0A7A',
                  '&:hover': { bgcolor: '#060554' },
                  borderRadius: '50px',
                  px: 4,
                  fontWeight: 700,
                  textTransform: 'none',
                }}
              >
                {submitting ? 'Salvando...' : 'Salvar'}
              </Button>
            </Box>
          </CourseForm>
        </Box>
      </Box>
    </ContentLayoutComponent>
  );
}
