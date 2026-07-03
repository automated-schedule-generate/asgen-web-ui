'use client';

import { Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';
import { SubjectType, subjectSchema } from '../_schemas/subject.schema';
import { createSubject } from '../_services/subjects.service';
import { FormInput } from '@/components/utilities/form-input.component';
import { CourseData } from '../../courses/_types/course.types';
import { Cancel, Save } from '@mui/icons-material';
import { Subject } from '../_interfaces/subject.interface';
import { toast } from 'react-toastify';
import { ConfirmDialogBlue } from '@/components/utilities/confirm-dialog-blue.component';
import { useState } from 'react';

export default function SubjectsCreateFormComponent({
  courses,
  subjects,
}: {
  courses: CourseData[];
  subjects: Subject[];
}) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isValid },
  } = useFormWithZod(subjectSchema, {
    defaultValues: {
      is_optional: false,
    },
  });

  const selectedCourseId = watch('course_id');
  const filteredSubjects = selectedCourseId
    ? subjects.filter((s) => s.course_id === selectedCourseId)
    : [];

  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);

  function handleCancelConfirm() {
    setCancelConfirmOpen(false);
    router.push('/subjects');
  }

  async function submit(data: SubjectType) {
    const toastId = toast.loading('Criando disciplina...');
    try {
      await createSubject(data);
      reset();
      toast.update(toastId, {
        render: 'Disciplina criada com sucesso!',
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      });
      router.push('/subjects');
    } catch {
      toast.update(toastId, {
        render: 'Falha ao criar! Tente novamente',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
        <FormInput
          name="name"
          label="Nome"
          id="name"
          placeholder="Digite o nome da disciplina"
          type="text"
          control={control}
          required
        />

        <FormInput
          name="workload"
          label="Carga Horária"
          id="workload"
          placeholder="Digite a carga horária"
          type="number"
          control={control}
          required
        />
        <Controller
          name="is_optional"
          defaultValue={false}
          control={control}
          render={({ field }) => (
            <>
              <FormLabel id="demo-row-radio-buttons-group-label">
                A disciplina é Optativa?
                <Typography component="span" color="error" aria-hidden>
                  {' *'}
                </Typography>
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={field.value === true ? 'true' : 'false'}
                onChange={(event) =>
                  field.onChange(event.target.value === 'true')
                }
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Sim"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Não"
                />
              </RadioGroup>
            </>
          )}
        />
        <Controller
          name="course_id"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Curso
                <Typography component="span" color="error" aria-hidden>
                  {' *'}
                </Typography>
              </FormLabel>
              <Autocomplete
                disablePortal
                options={courses.map((course: CourseData) => ({
                  label: course.name,
                  value: course.id,
                }))}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!error}
                    helperText={error?.message}
                    placeholder="Selecione um curso"
                  />
                )}
                onChange={(_event, value) => field.onChange(value?.value)}
              />
            </>
          )}
        />
        <Controller
          name="prerequisite_id"
          defaultValue={''}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Pré-requisito
              </FormLabel>
              <Autocomplete
                key={selectedCourseId || 'no-course'}
                disablePortal
                disabled={!selectedCourseId}
                options={filteredSubjects.map((subject: Subject) => ({
                  label: subject.name,
                  value: subject.id,
                }))}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!error}
                    helperText={error?.message}
                    placeholder={
                      !selectedCourseId
                        ? 'Selecione um curso primeiro'
                        : 'Selecione uma opção'
                    }
                  />
                )}
                onChange={(_event, value) => field.onChange(value?.value ?? '')}
              />
            </>
          )}
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
            type="submit"
            disabled={!isValid}
            variant="contained"
            color="secondary"
            className="self-end"
            endIcon={<Save />}
          >
            Salvar
          </Button>
        </Box>
      </form>
      <ConfirmDialogBlue
        open={cancelConfirmOpen}
        onConfirm={handleCancelConfirm}
        onCancel={() => setCancelConfirmOpen(false)}
        title="Cancelar"
        content="Tem certeza de que deseja cancelar? Se confirmar, seu progresso não será salvo."
      />
    </>
  );
}
