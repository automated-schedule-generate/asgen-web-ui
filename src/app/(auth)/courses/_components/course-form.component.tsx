'use client';

import React from 'react';
import {
  UseFormReturn,
  FieldValues,
  Path,
  Controller,
  ControllerRenderProps,
  ControllerFieldState,
} from 'react-hook-form';
import {
  Box,
  FormLabel,
  Autocomplete,
  TextField,
  Typography,
  OutlinedInput,
} from '@mui/material';
import { ClassTimeEnum } from '../_enums/course.enum';
import { FormInput } from '@/components/utilities/form-input.component';
import { CourseType } from '../_schemas/course.schema';

function TotalSemestersInput({
  field,
  fieldState,
}: {
  field: ControllerRenderProps<CourseType, 'total_semesters'>;
  fieldState: ControllerFieldState;
}) {
  return (
    <>
      <FormLabel htmlFor="total_semesters">
        Total de semestres
        <Typography component="span" color="error" aria-hidden>
          {' *'}
        </Typography>
      </FormLabel>
      <OutlinedInput
        value={field.value != null ? String(field.value) : ''}
        name={field.name}
        onBlur={field.onBlur}
        inputRef={field.ref}
        id="total_semesters"
        type="number"
        inputProps={{ min: 1 }}
        placeholder="Digite o total de semestres"
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

interface CourseFormProps<T extends FieldValues> {
  formMethods: UseFormReturn<T>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  children?: React.ReactNode;
  asDiv?: boolean;
}

const classTimeOptions = Object.values(ClassTimeEnum).map((val) => ({
  label: `${val} minutos`,
  value: val,
}));

export function CourseForm<T extends FieldValues>({
  formMethods,
  onSubmit,
  children,
  asDiv = false,
}: CourseFormProps<T>) {
  const {
    control,
    formState: { errors },
  } = formMethods;

  return (
    <Box
      component={asDiv ? 'div' : 'form'}
      onSubmit={asDiv ? undefined : onSubmit}
      noValidate={!asDiv}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        '& label, & .MuiFormLabel-root': {
          color: '#0B0A7A',
          fontWeight: 500,
          mb: '6px',
          display: 'block',
        },
        '& .MuiOutlinedInput-root': { borderRadius: '4px' },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormInput<T>
          control={control}
          id="name"
          name="name"
          type="text"
          label="Nome do Curso:"
          placeholder="Digite o nome do curso"
          required
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 3,
          width: '100%',
          mt: 0.75,
        }}
      >
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <FormLabel htmlFor="class_time">
            Duração da Hora-Aula
            <Typography component="span" color="error" aria-hidden>
              {' *'}
            </Typography>
          </FormLabel>
          <Controller
            name={'class_time' as Path<T>}
            control={control}
            render={({ field: { onChange, value, onBlur, ref } }) => (
              <Autocomplete
                options={classTimeOptions}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, val) =>
                  option.value ===
                    (val as unknown as { value: ClassTimeEnum })?.value ||
                  option.value === (val as unknown as ClassTimeEnum)
                }
                value={
                  classTimeOptions.find((opt) => opt.value === value) || null
                }
                onChange={(_event, newValue) => {
                  onChange(newValue ? newValue.value : '');
                }}
                onBlur={onBlur}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputRef={ref}
                    placeholder="Selecione um valor"
                    error={!!errors.class_time}
                    helperText={
                      errors.class_time ? String(errors.class_time.message) : ''
                    }
                  />
                )}
              />
            )}
          />
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Controller
            name={'total_semesters' as Path<T>}
            control={control}
            render={({ field, fieldState }) => (
              <TotalSemestersInput
                field={
                  field as unknown as ControllerRenderProps<
                    CourseType,
                    'total_semesters'
                  >
                }
                fieldState={fieldState}
              />
            )}
          />
        </Box>
      </Box>
      <Box sx={{ width: '100%' }}>{children}</Box>
    </Box>
  );
}
