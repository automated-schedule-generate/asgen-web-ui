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
} from '@mui/material';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';
import { SubjectType, subjectSchema } from '../_schemas/subject.schema';
import { FormInput } from '@/components/utilities/form-input.component';
import { CourseData } from '@/app/(auth)/courses/_types/course.types';
import { Cancel, Save } from '@mui/icons-material';
import { updateSubject } from '../_services/subjects.service';
import { Subject } from '../_interfaces/subject.interface';
import { useState } from 'react';
import { ConfirmDialogBlue } from '@/components/utilities/confirm-dialog-blue.component';
import { toast } from 'react-toastify';

export default function SubjectsEditFormComponent({
  subject,
  subjects,
  courses,
}: {
  subject: Subject;
  subjects: Subject[];
  courses: CourseData[];
}) {
  const router = useRouter();
  const {
    control,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useFormWithZod(subjectSchema, {
    mode: 'onChange',
    defaultValues: {
      name: subject.name,
      workload: subject.workload,
      is_optional: subject.is_optional,
      prerequisite_id: subject.prerequisite_id,
      course_id: subject.course_id || '',
    },
  });

  const selectedCourseId = watch('course_id');
  const filteredSubjects = selectedCourseId
    ? subjects.filter((s) => s.course_id === selectedCourseId)
    : [];

  const [confirmEditOpen, setConfirmEditOpen] = useState(false);
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);

  const handleCancel = () => {
    setCancelConfirmOpen(false);
    router.push('/subjects');
  };

  async function submit(id: string, data: SubjectType) {
    const toastId = toast.loading('Atualizando disciplina...');
    try {
      await updateSubject(id, data);
      toast.update(toastId, {
        type: 'success',
        isLoading: false,
        autoClose: 1500,
        render: 'Disciplina atualizada com sucesso!',
      });
      setConfirmEditOpen(false);
      router.push('/subjects');
    } catch {
      toast.update(toastId, {
        type: 'error',
        isLoading: false,
        autoClose: 1500,
        render: 'Erro ao atualizar disciplina!',
      });
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => submit(subject.id, data))}
        className="flex flex-col gap-2"
      >
        <FormInput
          name="name"
          label="Nome:"
          id="name"
          placeholder="Digite o nome da disciplina"
          type="text"
          control={control}
        />

        <FormInput
          name="workload"
          label="Carga Horária:"
          id="workload"
          placeholder="Digite a carga horária"
          type="number"
          control={control}
        />
        <Controller
          name="is_optional"
          defaultValue={false}
          control={control}
          render={({ field }) => (
            <>
              <FormLabel id="demo-row-radio-buttons-group-label">
                A disciplina é Optativa?
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
          name="prerequisite_id"
          control={control}
          render={({ field, fieldState: { error } }) => {
            const options = filteredSubjects.map((s) => ({
              label: s.name,
              value: s.id,
            }));

            return (
              <>
                <FormLabel>Pré-requisito:</FormLabel>
                <Autocomplete
                  {...field}
                  key={selectedCourseId || 'no-course'}
                  disabled={!selectedCourseId}
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
                      placeholder={
                        !selectedCourseId
                          ? 'Selecione um curso primeiro'
                          : 'Selecione uma opção'
                      }
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
                  value={options.find((opt) => opt.value === field.value)}
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
            content="Tem certeza que deseja editar a disciplina?"
            title="Editar Disciplina"
            onConfirm={() => {
              submit(subject.id, watch());
            }}
            onCancel={() => setConfirmEditOpen(false)}
          />
          <ConfirmDialogBlue
            open={cancelConfirmOpen}
            title="Cancelar Edição"
            content="As alterações não salvas serão perdidas. Deseja continuar?"
            onConfirm={handleCancel}
            onCancel={() => {
              setCancelConfirmOpen(false);
            }}
          />
        </Box>
      </form>
    </>
  );
}
