'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Controller } from 'react-hook-form';
import {
  Box,
  Button,
  CircularProgress,
  Autocomplete,
  TextField,
  FormLabel,
} from '@mui/material';
import { Cancel, Send } from '@mui/icons-material';

import { ContentLayoutComponent } from '@/components/utilities/content-layout.component';
import { FormInput } from '@/components/utilities/form-input.component';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';
import {
  courseSchema,
  CourseType,
} from '@/app/(auth)/courses/_schemas/course.schema';
import {
  getAllCourses,
  updateCourse,
} from '@/app/(auth)/courses/_services/courses.service';
import { CourseData } from '@/app/(auth)/courses/_types/course.types';

interface ClassTimeOption {
  label: string;
  value: '45' | '60';
}

const classTimeOptions: ClassTimeOption[] = [
  { label: '45 minutos', value: '45' },
  { label: '60 minutos', value: '60' },
];

export default function EditCoursePage() {
  const router = useRouter();
  const { id } = useParams();
  const [loadingData, setLoadingData] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useFormWithZod(courseSchema, {
    mode: 'onChange',
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
        reset({
          name: currentCourse.name,
          class_time: String(currentCourse.class_time) as '45' | '60',
          total_semesters: Number(currentCourse.total_semesters),
        } as CourseType);
      } else {
        console.error('Curso não mapeado no banco local.');
        router.push('/courses');
      }
    } catch (error) {
      console.error('Erro na requisição dos dados do curso:', error);
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

      reset({
        name: '',
        class_time: '45',
        total_semesters: 1,
      });

      router.refresh();

      setTimeout(() => {
        router.replace('/courses');
      }, 100);
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
      <Box
        sx={{
          width: '100%',
          maxWidth: 'md',
          mt: 2,
          '& .MuiInputLabel-root': { color: '#0B0A7A', fontWeight: 500 },
          '& .MuiFormLabel-root': {
            color: '#0B0A7A',
            fontWeight: 500,
            mb: '6px',
            display: 'block',
          },
          '& .MuiOutlinedInput-root': { borderRadius: '4px' },
        }}
      >
        <form
          onSubmit={handleSubmit(handleEditSubmit)}
          className="flex flex-col gap-4"
        >
          <FormInput
            name="name"
            label="Nome do Curso:"
            id="name"
            placeholder="Digite o nome do curso"
            type="text"
            control={control}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 3,
              width: '100%',
              mt: 0.75,
            }}
          >
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <FormLabel htmlFor="class_time">Carga Horária:</FormLabel>
              <Controller
                name="class_time"
                control={control}
                render={({ field: { onChange, value, onBlur, ref } }) => (
                  <Autocomplete
                    options={classTimeOptions}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    value={
                      classTimeOptions.find((opt) => opt.value === value) ||
                      null
                    }
                    onChange={(_event, newValue) => {
                      onChange(newValue ? newValue.value : '');
                    }}
                    onBlur={onBlur}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputRef={ref}
                        placeholder="Selecione 45 ou 60"
                      />
                    )}
                  />
                )}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <FormInput
                name="total_semesters"
                label="Total de Semestres:"
                id="total_semesters"
                placeholder="Digite o total de semestres"
                type="number"
                control={control}
              />
            </Box>
          </Box>

          <Box className="flex justify-end gap-2 mt-6">
            <Button
              type="button"
              variant="outlined"
              color="error"
              className="self-end"
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
              className="self-end"
              endIcon={<Send />}
              sx={{
                borderRadius: '4px',
                textTransform: 'none',
                fontWeight: 700,
              }}
            >
              Enviar
            </Button>
          </Box>
        </form>
      </Box>
    </ContentLayoutComponent>
  );
}
