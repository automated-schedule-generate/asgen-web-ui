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
import { createSubject } from '../_services/subjects.service';
import { FormInput } from '@/components/utilities/form-input.component';
import { CourseType } from '../../courses/_schemas/course.schema';
import { Cancel, Send } from '@mui/icons-material';
import { Subject } from '../_interfaces/subject.interface';

export default function SubjectsCreateFormComponent({
  subjects,
  courses,
}: {
  subjects: Subject[];
  courses: CourseType[];
}) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useFormWithZod(subjectSchema, {
    mode: 'onChange',
  });

  async function submit(data: SubjectType) {
    try {
      await createSubject(data);
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
          defaultValue={''}
          control={control}
          render={({ field }) => (
            <>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Pré-requisito:
              </FormLabel>
              <Autocomplete
                disablePortal
                options={subjects.map((subject: Subject) => ({
                  label: subject.name,
                  value: subject.id,
                }))}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} />}
                onChange={(_event, value) => field.onChange(value?.value)}
              />
            </>
          )}
        />
        <Controller
          name="course_id"
          control={control}
          render={({ field }) => (
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
                renderInput={(params) => <TextField {...params} />}
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
