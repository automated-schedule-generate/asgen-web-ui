'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  useRouter as useNextRouter,
  useParams as useNextParams,
} from 'next/navigation';
import { Box, Button, CircularProgress, DialogActions } from '@mui/material';
import { Cancel, Send } from '@mui/icons-material';

import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';
import {
  courseSchema,
  CourseType,
} from '@/app/(auth)/courses/_schemas/course.schema';
import {
  getCourseById,
  updateCourse,
} from '@/app/(auth)/courses/_services/courses.service';
import { CourseForm } from '@/app/(auth)/courses/_components/course-form.component';

export default function EditCoursePage() {
  const router = useNextRouter();
  const { id } = useNextParams();
  const [loadingData, setLoadingData] = useState(true);

  const formMethods = useFormWithZod(courseSchema, {
    defaultValues: {
      class_time: '45',
      total_semesters: 1,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  const loadCourseData = useCallback(async () => {
    if (!id) return;
    setLoadingData(true);
    try {
      const res = await getCourseById(id as string);
      const currentCourse = res?.data || res;

      if (currentCourse) {
        reset({
          name: currentCourse.name,
          class_time: String(currentCourse.class_time) as '45' | '60',
          total_semesters: Number(currentCourse.total_semesters),
        } as CourseType);
      } else {
        console.error('Curso não encontrado.');
        router.push('/courses');
      }
    } catch (error) {
      console.error('Erro na requisição dos dados do curso:', error);
      router.push('/courses');
    } finally {
      setLoadingData(false);
    }
  }, [id, reset, router]);

  useEffect(() => {
    loadCourseData();
  }, [loadCourseData]);

  const handleEditSubmit = async (data: CourseType) => {
    if (!id) return;
    try {
      await updateCourse(id as string, data);
      router.push('/courses');
    } catch (error) {
      console.error('Erro ao processar atualização:', error);
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
      <Box sx={{ width: '100%', mt: 2 }}>
        <CourseForm
          formMethods={formMethods}
          onSubmit={handleSubmit(handleEditSubmit)}
        >
          <DialogActions sx={{ px: 0, mt: 1, justifyContent: 'end', gap: 2 }}>
            <Button
              type="button"
              variant="outlined"
              color="error"
              startIcon={<Cancel />}
              onClick={() => router.push('/courses')}
              sx={{
                borderRadius: '4px',
                textTransform: 'none',
                fontWeight: 700,
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
              variant="contained"
              color="secondary"
              endIcon={<Send />}
              sx={{
                borderRadius: '4px',
                textTransform: 'none',
                fontWeight: 700,
              }}
            >
              Enviar
            </Button>
          </DialogActions>
        </CourseForm>
      </Box>
    </ContentLayoutComponent>
  );
}
