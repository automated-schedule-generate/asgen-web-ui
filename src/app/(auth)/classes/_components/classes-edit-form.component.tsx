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
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';
import { classSchema, ClassType } from '../_schemas/class.schema';
import { FormInput } from '@/components/utilities/form-input.component';
import { CourseData } from '@/app/(auth)/courses/_types/course.types';
import { Cancel, Save } from '@mui/icons-material';
import { updateClass } from '../_services/classes.service';
import { Class } from '../_interfaces/class.interface';
import { Semester } from '../../semesters/_interfaces/semester.interface';
import { useState } from 'react';
import { ControllerRenderProps, ControllerFieldState } from 'react-hook-form';
import { ConfirmDialogBlue } from '@/components/utilities/confirm-dialog-blue.component';
import { toast } from 'react-toastify';

function CourseSemesterInput({
  field,
  fieldState,
}: {
  field: ControllerRenderProps<ClassType, 'course_semester'>;
  fieldState: ControllerFieldState;
}) {
  return (
    <>
      <label htmlFor="course_semester">
        Período do Curso
        <Typography component="span" color="error" aria-hidden>
          {' *'}
        </Typography>
      </label>
      <OutlinedInput
        value={field.value != null ? String(field.value) : ''}
        name={field.name}
        onBlur={field.onBlur}
        inputRef={field.ref}
        id="course_semester"
        type="number"
        inputProps={{ min: 0 }}
        placeholder="Digite o período do curso"
        error={!!fieldState.error}
        onChange={(e) => {
          const raw = e.target.value;
          if (raw === '') {
            field.onChange(undefined);
          } else {
            const val = Number(raw);
            field.onChange(val < 0 ? 0 : val);
          }
        }}
        onKeyDown={(e) => {
          if (['-', 'e', 'E', '.'].includes(e.key)) e.preventDefault();
        }}
      />
      {fieldState.error && (
        <Typography color="error" variant="caption">
          {fieldState.error.message}
        </Typography>
      )}
    </>
  );
}

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
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);

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
    const toastId = toast.loading('Editando turma...');
    try {
      await updateClass(id, data);
      toast.update(toastId, {
        type: 'success',
        render: 'Turma atualizada com sucesso!',
        isLoading: false,
        autoClose: 1500,
      });
      reset();
      router.push('/classes');
    } catch {
      toast.update(toastId, {
        type: 'error',
        render: 'Erro ao atualizar turma!',
        isLoading: false,
        autoClose: 1000,
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit((data) => submit(classe.id, data))}
      className="flex flex-col gap-2"
    >
      <FormInput
        name="identify"
        label="Nome"
        id="identify"
        placeholder="Digite o nome da turma"
        type="text"
        control={control}
        required
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
              <FormLabel>
                Curso
                <Typography component="span" color="error" aria-hidden>
                  {' *'}
                </Typography>
              </FormLabel>
              <Autocomplete
                {...field}
                options={options}
                value={options.find((opt) => opt.value === field.value) || null}
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

      <Controller
        name="course_semester"
        control={control}
        render={({ field, fieldState }) => (
          <CourseSemesterInput field={field} fieldState={fieldState} />
        )}
      />

      <Controller
        name="shift"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <FormLabel htmlFor="shift-select">
              Turno
              <Typography component="span" color="error" aria-hidden>
                {' *'}
              </Typography>
            </FormLabel>
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
              <FormLabel>
                Semestre letivo
                <Typography component="span" color="error" aria-hidden>
                  {' *'}
                </Typography>
              </FormLabel>
              <Autocomplete
                {...field}
                options={options}
                value={options.find((opt) => opt.value === field.value) || null}
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
          variant="contained"
          color="error"
          className="self-end"
          startIcon={<Cancel />}
          onClick={() => setCancelConfirmOpen(true)}
        >
          Cancelar
        </Button>
        <Button
          type="button"
          disabled={!isValid}
          variant="contained"
          color="secondary"
          className="self-end"
          endIcon={<Save />}
          onClick={() => setConfirmEditOpen(true)}
        >
          Salvar
        </Button>
        <ConfirmDialogBlue
          open={confirmEditOpen}
          content="Tem certeza que deseja editar a turma?"
          title="Editar Turma"
          onConfirm={() => submit(classe.id, watch())}
          onCancel={() => setConfirmEditOpen(false)}
        />
        <ConfirmDialogBlue
          open={cancelConfirmOpen}
          title="Cancelar Edição"
          content="As alterações não salvas serão perdidas. Deseja continuar?"
          onConfirm={() => router.push('/classes')}
          onCancel={() => {
            setCancelConfirmOpen(false);
          }}
        />
      </Box>
    </form>
  );
}
