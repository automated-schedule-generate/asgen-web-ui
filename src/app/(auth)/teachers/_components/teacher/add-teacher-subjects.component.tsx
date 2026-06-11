'use client';

import { Subject } from '@/app/(auth)/subjects/_interfaces/subject.interface';
import { Semester } from '@/app/(auth)/semesters/_interfaces/semester.interface';
import {
  Autocomplete,
  Box,
  Button,
  FormLabel,
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
    try {
      await addSubjectTeacher({
        subject_id: data.subject_id,
        teacher_id,
        semester_id: data.semester_id,
      });
      reset();
      onClose?.();
      router.refresh();
    } catch (error) {
      console.log(error);
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
        gap: 2,
        border: '1px solid #e0e0e0',
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" sx={{ textAlign: 'center' }}>
        Atribuir Disciplina
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="flex flex-col gap-2  mt-1 mb-2">
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
                  <FormLabel>Disciplina:</FormLabel>
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
                    renderInput={(params) => <TextField {...params} />}
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
                  <FormLabel>Semestre:</FormLabel>
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
                    renderInput={(params) => <TextField {...params} />}
                  />
                </>
              );
            }}
          />
          <Box className="flex gap-2 self-end mt-1">
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => onClose?.()}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={!isValid}
            >
              Adicionar
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
