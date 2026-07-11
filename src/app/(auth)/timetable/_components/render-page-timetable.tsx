'use client';

import {
  Autocomplete,
  Box,
  Button,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { GenerateTimetable } from './generate-timetable';
import { RenderCourseWithTimetable } from './render-course-with-timetable';
import { CourseData } from '../../courses/_types/course.types';
import { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  TimetableFilterSchema,
  TimetableFilterType,
} from '../_schemas/timetable-filter-schema';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';
import { getCourseWithTimetable } from '../../courses/_services/courses.service';
import { toast } from 'react-toastify';

interface RenderPageProps {
  readonly courses: CourseData[];
}

export function RenderPageTimetable({ courses }: RenderPageProps) {
  const [coursesWithTimetable, setCoursesWithTimetable] = useState<
    CourseData[]
  >([]);
  const { control, handleSubmit } = useFormWithZod(TimetableFilterSchema);

  const fetchTimetable = useCallback(async (course_id: string) => {
    const data = await getCourseWithTimetable({
      course_id: course_id === '0' ? undefined : course_id,
    });

    setCoursesWithTimetable(data);
  }, []);

  async function fetchSubmit(data: TimetableFilterType) {
    const toastLoading = toast.loading('Buscando...');
    try {
      await fetchTimetable(data.course_id);
      toast.update(toastLoading, {
        type: 'success',
        render: 'Turma encontrada com sucesso!',
        isLoading: false,
        autoClose: 1500,
      });
    } catch {
      toast.update(toastLoading, {
        type: 'error',
        render: 'Erro ao buscar turma!',
        isLoading: false,
        autoClose: 1000,
      });
    }
  }

  return (
    <Box>
      <Paper variant="outlined" sx={{ p: 2, mb: 4, borderRadius: 3 }}>
        <GenerateTimetable />
        <form
          onSubmit={handleSubmit(fetchSubmit)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflow: 'hidden',
          }}
        >
          <Box className="flex flex-col gap-4">
            <Controller
              name="course_id"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <FormLabel>
                    Selecione um curso
                    <Typography component="span" color="error" aria-hidden>
                      {' *'}
                    </Typography>
                  </FormLabel>
                  <Autocomplete
                    disablePortal
                    disableClearable
                    options={courses.map((course: CourseData) => ({
                      label: course.name,
                      value: course.id,
                    }))}
                    defaultValue={{
                      label: courses[0].name,
                      value: courses[0].id,
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Selecione um curso"
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                    onChange={(_event, value) => field.onChange(value?.value)}
                  />
                </>
              )}
            />
          </Box>
          <Box className="flex justify-start mt-4">
            <Button variant="contained" color="secondary" type="submit">
              Buscar
            </Button>
          </Box>
        </form>
      </Paper>
      {coursesWithTimetable.map((course) => (
        <RenderCourseWithTimetable
          key={'course-timetable-render-' + course.id}
          course={course}
        />
      ))}
    </Box>
  );
}
