'use client';

import { useRouter } from 'next/navigation';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  TextField,
  MenuItem,
} from '@mui/material';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';
import { FormInput } from '@/components/utilities/form-input.component';
import { CourseType } from '../../courses/_schemas/course.schema';
import { Cancel, Send } from '@mui/icons-material';
import { classSchema, ClassType } from '../_schemas/class.schema';
import { createClass } from '../_services/classes.service';
import { Controller } from 'react-hook-form';
import { Semester } from '../../semesters/_interfaces/semester.interface';

export default function ClassesCreateFormComponent({
  courses,
  semesters,
}: {
  courses: CourseType[];
  semesters: Semester[];
}) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useFormWithZod(classSchema, {
    defaultValues: {
      shift: 'MATUTINO',
    },
  });

  async function submit(data: ClassType) {
    try {
      await createClass(data);
      reset();
      router.push('/classes');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
        <FormInput
          name="identify"
          label="Nome:"
          id="identify"
          placeholder="Digite o nome da turma"
          type="text"
          control={control}
        />
        <Controller
          name="course_id"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Curso:
              </FormLabel>
              <Autocomplete
                disablePortal
                options={courses.map((course: CourseType) => ({
                  label: course.name,
                  value: course.id,
                }))}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
                onChange={(_event, value) => field.onChange(value?.value)}
              />
            </>
          )}
        />
        <FormInput
          name="course_semester"
          label="Período do Curso:"
          id="course_semester"
          placeholder="Digite o período do curso"
          type="number"
          control={control}
        />
        <Controller
          name="shift"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <FormLabel htmlFor="demo-simple-select">Turno:</FormLabel>
              <FormControl>
                <Select
                  value={field.value ?? ''}
                  onChange={(event) => field.onChange(event.target.value)}
                >
                  <MenuItem value="" disabled>
                    Selecione um turno
                  </MenuItem>
                  <MenuItem value="MATUTINO">Matutino</MenuItem>
                  <MenuItem value="VESPERTINO">Vespertino</MenuItem>
                  <MenuItem value="NOTURNO">Noturno</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
        />
        <Controller
          name="semester_id"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Semestre letivo:
              </FormLabel>
              <Autocomplete
                disablePortal
                options={semesters.map((semester: Semester) => ({
                  label: semester.year + '.' + semester.semester,
                  value: semester.id,
                }))}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
                onChange={(_event, value) => field.onChange(value?.value)}
              />
            </>
          )}
        />
        <Box className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outlined"
            color="error"
            className="self-end"
            startIcon={<Cancel />}
            onClick={() => router.push('/classes')}
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
          >
            Enviar
          </Button>
        </Box>
      </form>
    </>
  );
}
