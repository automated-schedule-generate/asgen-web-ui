'use client';

import { Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControlLabel,
  FormLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';
import { SubjectType, subjectSchema } from '../_schemas/subject.schema';
import { FormInput } from '@/components/utilities/form-input.component';
import { CourseType } from '../../courses/_schemas/course.schema';
import { Cancel, Send } from '@mui/icons-material';
import { updateSubject } from '../_services/subjects.service';

export default function SubjectsEditFormComponent({
  subject,
  subjects,
  courses,
}: {
  subject: SubjectType;
  subjects: SubjectType[];
  courses: CourseType[];
}) {
  const router = useRouter();
  const {
    control,
    watch,
    handleSubmit,
    trigger,
    reset,
    formState: { isValid },
  } = useFormWithZod(subjectSchema, {
    mode: 'onChange',
    defaultValues: {
      name: subject.name,
      workload: subject.workload,
      is_optional: subject.is_optional,
      prerequisite_id: subject.prerequisite_id,
      course_id: subject.course_id,
    },
  });

  async function submit(data: SubjectType) {
    try {
      await updateSubject({ id: subject.id, ...data });
      reset();
      router.push('/subjects');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
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
          render={({ field }) => {
            const options = subjects.map((s) => ({
              label: s.name,
              value: s.id,
            }));

            return (
              <>
                <FormLabel>Pré-requisito:</FormLabel>
                <Autocomplete
                  {...field}
                  options={options}
                  value={
                    options.find((opt) => opt.value === field.value) || null
                  }
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} />}
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
          render={({ field }) => {
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
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(_event, newValue) =>
                    field.onChange(newValue?.value || '')
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
            onClick={() => router.push('/subjects')}
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
