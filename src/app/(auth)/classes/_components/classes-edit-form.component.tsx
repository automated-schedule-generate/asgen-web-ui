'use client';

import { Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';
import { classSchema, ClassType } from '../_schemas/class.schema';
import { FormInput } from '@/components/utilities/form-input.component';
import { CourseData } from '@/app/(auth)/courses/_types/course.types';
import { Cancel, Send } from '@mui/icons-material';
import { updateClass } from '../_services/classes.service';
import { Class } from '../_interfaces/class.interface';
import { Semester } from '../../semesters/_interfaces/semester.interface';
import { ConfirmDialog } from '@/components/utilities/confirm-dialog.component';
import { useState } from 'react';

export default function ClassesEditFormComponent({
  classe,
  courses,
  semesters,
}: {
  classe: Class;
  courses: CourseData[];
  semesters: Semester[];
}) {
  const router = useRouter();
  const [confirmEditOpen, setConfirmEditOpen] = useState(false);

  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useFormWithZod(classSchema, {
    mode: 'onChange',
    defaultValues: {
      identify: classe.identify,
      shift: classe.shift,
      course_semester: classe.course_semester,
      course_id: classe.course_id,
      semester_id: classe.semester_id,
    },
  });

  async function submit(id: string, data: ClassType) {
    try {
      await updateClass(id, data);
      reset();
      router.push('/classes');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => submit(classe.id, data))}
        className="flex flex-col gap-2"
      >
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
          render={({ field, fieldState: { error } }) => {
            const options = courses.map((c) => ({
              label: c.name,
              value: c.id,
            }));
            return (
              <>
                <FormLabel>Curso:</FormLabel>
                <Autocomplete
                  {...field}
                  options={options}
                  value={
                    options.find((opt) => opt.value === field.value) || null
                  }
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                  onChange={(_event, newValue) =>
                    field.onChange(newValue?.value || null)
                  }
                />
              </>
            );
          }}
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
              <FormLabel htmlFor="shift-select">Turno:</FormLabel>
              <FormControl>
                <Select
                  id="shift-select"
                  value={field.value ?? ''}
                  onChange={(event) => field.onChange(event.target.value)}
                  error={!!error}
                >
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
          render={({ field, fieldState: { error } }) => {
            const options = semesters.map((s) => ({
              label: `${s.year}.${s.semester}`,
              value: s.id,
            }));
            return (
              <>
                <FormLabel>Semestre letivo:</FormLabel>
                <Autocomplete
                  {...field}
                  options={options}
                  value={
                    options.find((opt) => opt.value === field.value) || null
                  }
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                  onChange={(_event, newValue) =>
                    field.onChange(newValue?.value || null)
                  }
                />
              </>
            );
          }}
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
            type="button"
            disabled={!isValid}
            variant="contained"
            color="secondary"
            className="self-end"
            endIcon={<Send />}
            onClick={() => setConfirmEditOpen(true)}
          >
            Enviar
          </Button>
          <ConfirmDialog
            open={confirmEditOpen}
            content="Tem certeza que deseja editar a turma?"
            title="Editar Turma"
            onConfirm={() => submit(classe.id, watch())}
            onCancel={() => setConfirmEditOpen(false)}
          />
        </Box>
      </form>
    </>
  );
}
