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
import { Semester } from '../../semesters/_interfaces/semester.interface';
import { useCallback, useEffect, useState } from 'react';
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
  readonly semesters: Semester[];
}

export function RenderPageTimetable({ courses, semesters }: RenderPageProps) {
  const [disableAll, setDisableAll] = useState(true);
  const [coursesWithTimetable, setCoursesWithTimetable] = useState<
    CourseData[]
  >([]);
  const [showInfo, setShowInfo] = useState(true);
  const { control, handleSubmit, setValue } = useFormWithZod(
    TimetableFilterSchema,
    {
      defaultValues: {
        semester_id: semesters[0]?.id ?? '',
        course_id: '0',
      },
    },
  );

  const courseId = useWatch({ control, name: 'course_id' });
  const selectedCourse = courses.find((course) => course.id === courseId);
  const isSemesterDisabled = !courseId || courseId === '0';
  const totalSemesters = isSemesterDisabled
    ? 0
    : Number(selectedCourse?.total_semesters ?? 0);

  const fetchTimetable = useCallback(
    async ({
      course_id,
      course_semester,
      semester_id,
    }: TimetableFilterType) => {
      try {
        const response = await getCourseWithTimetable({
          course_id: course_id === '0' ? undefined : course_id,
          course_semester: course_semester || undefined,
          semester_id: semester_id || undefined,
        });

        if (response.success && response.data) {
          setCoursesWithTimetable(response.data);
        }
        if (!response.success) {
          console.log(response?.error);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [],
  );

  const fetchSubmit = useCallback(
    async (data: TimetableFilterType) => {
      localStorage.setItem('filter-timetable', JSON.stringify(data));
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
    },
    [fetchTimetable],
  );

  useEffect(() => {
    const filter = localStorage.getItem('filter-timetable') ?? '{}';
    const filterParsed = JSON.parse(filter);
    const data: TimetableFilterType = {
      course_id: filterParsed?.course_id ?? '0',
      course_semester: filterParsed?.course_semester,
      semester_id: filterParsed?.semester_id ?? semesters[0]?.id ?? '',
    };

    setValue('course_id', data.course_id);
    setValue('course_semester', data?.course_semester);
    setValue('semester_id', data?.semester_id);

    const shouldFetch =
      data.course_id?.trim() !== '' && data.course_id?.trim() !== '0';
    Promise.resolve()
      .then(() => (shouldFetch ? fetchSubmit(data) : undefined))
      .finally(() => setDisableAll(false));
  }, [setValue, semesters, fetchSubmit]);

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
                    disabled={disableAll}
                    options={courses.map((course: CourseData) => ({
                      label: course.name,
                      value: course.id,
                    }))}
                    value={{
                      label: field.value
                        ? courses.find((course) => course.id === field.value)
                            ?.name
                        : '',
                      value: field.value || '',
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
                    disabled={disableAll || isSemesterDisabled}
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
            <Controller
              name="semester_id"
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>Selecione um semestre</FormLabel>
                  <Select
                    {...field}
                    value={field.value ?? semesters[0]?.id}
                    displayEmpty
                    disabled={disableAll}
                  >
                    {semesters.map((semester) => (
                      <MenuItem key={semester.id} value={semester.id}>
                        {semester.year}.{semester.semester}
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
