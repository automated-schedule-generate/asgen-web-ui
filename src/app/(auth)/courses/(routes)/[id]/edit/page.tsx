'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Box, Button, CircularProgress, DialogActions } from '@mui/material';
import { Cancel, Save } from '@mui/icons-material';

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
import { ConfirmDialogBlue } from '@/components/utilities/confirm-dialog-blue.component';
import { toast } from 'react-toastify';

export default function EditCoursePage() {
  const router = useRouter();
  const { id } = useParams();
  const [loadingData, setLoadingData] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingData, setPendingData] = useState<CourseType | null>(null);
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);

  const formMethods = useFormWithZod(courseSchema, {
    defaultValues: {
      class_time: '45',
      total_semesters: 1,
    },
  });

  const { handleSubmit, reset, trigger } = formMethods;

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
        await trigger();
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
  }, [id, reset, router, trigger]);

  useEffect(() => {
    loadCourseData();
  }, [loadCourseData]);

  const handleEditSubmit = async (data: CourseType) => {
    console.log('data:', data);
    setPendingData(data);
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!id || !pendingData) return;
    const toastId = toast.loading('Editando curso...');
    try {
      await updateCourse(id as string, pendingData);
      toast.update(toastId, {
        type: 'success',
        render: 'Curso atualizado com sucesso!',
        isLoading: false,
        autoClose: 1500,
      });
      router.push('/courses');
    } catch (error) {
      console.error('Erro ao processar atualização:', error);
      toast.update(toastId, {
        type: 'error',
        render: 'Erro ao atualizar curso!',
        isLoading: false,
        autoClose: 1000,
      });
    } finally {
      setConfirmOpen(false);
      setPendingData(null);
    }
  };
  const handleCancel = () => {
    setCancelConfirmOpen(false);
    router.push('/courses');
  };

  if (loadingData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress size={50} sx={{ color: '#0B0A7A' }} />
      </Box>
    );
  }

  return (
    <>
      <ContentLayoutComponent
        title="Editar Curso"
        description="Modifique as informações gerais do curso selecionado."
        hasPagination={false}
      >
        <Box sx={{ width: '100%', mt: 2 }}>
          <CourseForm
            formMethods={formMethods}
            onSubmit={handleSubmit(handleEditSubmit, (errors) =>
              console.log('errors:', errors),
            )}
          >
            <DialogActions>
              <Button
                type="button"
                variant="contained"
                color="error"
                startIcon={<Cancel />}
                onClick={() => setCancelConfirmOpen(true)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                endIcon={<Save />}
              >
                Salvar
              </Button>
            </DialogActions>
          </CourseForm>
        </Box>
      </ContentLayoutComponent>

      <ConfirmDialogBlue
        open={confirmOpen}
        title="Editar Curso"
        content="Tem certeza que deseja salvar as alterações deste curso?"
        onConfirm={handleConfirm}
        onCancel={() => {
          setConfirmOpen(false);
          setPendingData(null);
        }}
      />
      <ConfirmDialogBlue
        open={cancelConfirmOpen}
        title="Cancelar Edição"
        content="As alterações não salvas serão perdidas. Deseja continuar?"
        onConfirm={handleCancel}
        onCancel={() => {
          setCancelConfirmOpen(false);
        }}
      />
    </>
  );
}
