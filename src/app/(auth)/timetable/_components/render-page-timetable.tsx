'use client';

import {
  Autocomplete,
  Box,
  Button,
  FormLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { GenerateTimetable } from './generate-timetable';
import { RenderCourseWithTimetable } from './render-course-with-timetable';
import { CourseData } from '../../courses/_types/course.types';
import { useCallback, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
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
  const [showInfo, setShowInfo] = useState(true);
  const { control, handleSubmit, setValue } = useFormWithZod(
    TimetableFilterSchema,
  );

  const courseId = useWatch({ control, name: 'course_id' });
  const selectedCourse = courses.find((course) => course.id === courseId);
  const isSemesterDisabled = !courseId || courseId === '0';
  const totalSemesters = isSemesterDisabled
    ? 0
    : Number(selectedCourse?.total_semesters ?? 0);

  const fetchTimetable = useCallback(
    async ({ course_id, course_semester }: TimetableFilterType) => {
      try {
        const data = await getCourseWithTimetable({
          course_id: course_id === '0' ? undefined : course_id,
          course_semester: course_semester || undefined,
        });

        setCoursesWithTimetable(data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [],
  );

  async function fetchSubmit(data: TimetableFilterType) {
    const toastLoading = toast.loading('Buscando...');
    try {
      await fetchTimetable(data);
      setShowInfo(data?.course_semester?.trim() === '');
      toast.update(toastLoading, {
        type: 'success',
        render: 'Grade encontrada com sucesso!',
        isLoading: false,
        autoClose: 1500,
      });
    } catch {
      toast.update(toastLoading, {
        type: 'error',
        render: 'Erro ao buscar Grade!',
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
                    onChange={(_event, value) => {
                      field.onChange(value?.value);
                      setValue('course_semester', '');
                    }}
                  />
                </>
              )}
            />
            <Controller
              name="course_semester"
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>Selecione um período</FormLabel>
                  <Select
                    {...field}
                    value={field.value ?? ''}
                    displayEmpty
                    disabled={isSemesterDisabled}
                  >
                    <MenuItem value="">Todos os períodos</MenuItem>
                    {Array.from({ length: totalSemesters }, (_, index) => (
                      <MenuItem key={index + 1} value={String(index + 1)}>
                        {index + 1}º período
                      </MenuItem>
                    ))}
                  </Select>
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
          show_info={showInfo}
        />
      ))}
    </Box>
  );
}
