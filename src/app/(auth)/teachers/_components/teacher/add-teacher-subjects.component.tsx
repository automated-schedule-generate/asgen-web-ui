'use client';

import { Subject } from '@/app/(auth)/subjects/_interfaces/subject.interface';
import { Semester } from '@/app/(auth)/semesters/_interfaces/semester.interface';
import {
  Autocomplete,
  Box,
  Button,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import {
  teacherSubjectsSchema,
  TeacherSubjectsType,
} from '../../_schemas/teachers-subjects.schema';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';
import { Controller } from 'react-hook-form';
import { addSubjectTeacher } from '@/app/(auth)/subjects/_services/subjects.service';
import { useRouter } from 'next/navigation';
import { Add, Attribution, Cancel, Close } from '@mui/icons-material';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';

export function AddTeacherSubjectsComponent({
  availableSubjects,
  semesters,
  teacher_id,
  onClose,
}: {
  availableSubjects: Subject[];
  semesters: Semester[];
  teacher_id: string;
  onClose?: () => void;
}) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useFormWithZod(teacherSubjectsSchema, {
    mode: 'onChange',
  });

  async function onSubmit(data: TeacherSubjectsType) {
    const toastId = toast.loading('Atribuindo disciplina...');
    try {
      await addSubjectTeacher({
        subject_id: data.subject_id,
        teacher_id,
        semester_id: data.semester_id,
      });
      reset();
      onClose?.();
      toast.update(toastId, {
        render: 'Disciplina atribuída com sucesso!',
        type: 'success',
        isLoading: false,
        autoClose: 1500,
      });
      router.refresh();
    } catch {
      toast.update(toastId, {
        render: 'Erro ao atribuir disciplina.',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    }
  }

  return (
    <Box
      sx={{
        mt: 2,
        mb: 2,
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'secondary.light',
        gap: 2,
      }}
      component={Paper}
      elevation={2}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="flex flex-col gap-2  mt-1 mb-2 p-2">
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 500 }}>
            Atribuir Disciplina
          </Typography>
          <Controller
            control={control}
            name="subject_id"
            render={({ field }) => {
              const options = availableSubjects.map((subject: Subject) => ({
                label: subject.name,
                value: subject.id,
              }));
              return (
                <>
                  <FormLabel>
                    Disciplina
                    <Typography component="span" color="error" aria-hidden>
                      {' *'}
                    </Typography>
                  </FormLabel>
                  <Autocomplete
                    options={options}
                    value={options.find((o) => o.value === field.value) ?? null}
                    onChange={(_, newValue) =>
                      field.onChange(newValue?.value ?? '')
                    }
                    renderOption={(props, option) => (
                      <li {...props} key={option.value}>
                        {option.label}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Selecione uma disciplina"
                      />
                    )}
                  />
                </>
              );
            }}
          />
          <Controller
            control={control}
            name="semester_id"
            render={({ field }) => {
              const options = semesters.map((semester: Semester) => ({
                label: `${semester.year}.${semester.semester}`,
                value: semester.id,
              }));
              return (
                <>
                  <FormLabel>
                    Semestre
                    <Typography component="span" color="error" aria-hidden>
                      {' *'}
                    </Typography>
                  </FormLabel>
                  <Autocomplete
                    options={options}
                    value={options.find((o) => o.value === field.value) ?? null}
                    onChange={(_, newValue) =>
                      field.onChange(newValue?.value ?? '')
                    }
                    renderOption={(props, option) => (
                      <li {...props} key={option.value}>
                        {option.label}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Selecione um semestre"
                      />
                    )}
                  />
                </>
              );
            }}
          />
          <Box className="flex gap-2 self-end mt-1">
            <Button
              startIcon={<Cancel />}
              variant="contained"
              color="error"
              onClick={() => onClose?.()}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              startIcon={<Add />}
              variant="contained"
              color="secondary"
              disabled={!isValid}
            >
              Atribuir
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
