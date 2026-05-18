'use client';

import React from 'react';
import { UseFormReturn, FieldValues, Path, Controller } from 'react-hook-form';
import { Box, TextField, FormLabel, Autocomplete } from '@mui/material';

interface CourseFormProps<T extends FieldValues> {
  formMethods: UseFormReturn<T, unknown, unknown>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  children?: React.ReactNode;
}

interface ClassTimeOption {
  label: string;
  value: '45' | '60';
}

const classTimeOptions: ClassTimeOption[] = [
  { label: '45 minutos', value: '45' },
  { label: '60 minutos', value: '60' },
];

export function CourseForm<T extends FieldValues>({
  formMethods,
  onSubmit,
  children,
}: CourseFormProps<T>) {
  const {
    register,
    control,
    formState: { errors },
  } = formMethods;

  const nameKey = 'name' as Path<T>;
  const classTimeKey = 'class_time' as Path<T>;
  const totalSemestersKey = 'total_semesters' as Path<T>;

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      noValidate
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        '& .MuiInputLabel-root': { color: '#0B0A7A', fontWeight: 500 },
        '& .MuiFormLabel-root': {
          color: '#0B0A7A',
          fontWeight: 500,
          mb: '6px',
          display: 'block',
        },
        '& .MuiOutlinedInput-root': { borderRadius: '4px' },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormLabel htmlFor="name">Nome do Curso:</FormLabel>
        <TextField
          {...register(nameKey)}
          id="name"
          placeholder="Digite o nome do curso"
          fullWidth
          error={!!errors.name}
          helperText={errors.name ? String(errors.name.message) : ''}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 3,
          width: '100%',
          mt: 0.75,
        }}
      >
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <FormLabel htmlFor="class_time">Carga Horária:</FormLabel>
          <Controller
            name={classTimeKey}
            control={control}
            render={({ field: { onChange, value, onBlur, ref } }) => (
              <Autocomplete
                options={classTimeOptions}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, val) =>
                  option.value === (val as unknown as ClassTimeOption)?.value ||
                  option.value === (val as unknown as string)
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
                    placeholder="Selecione 45 ou 60"
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
          <FormLabel htmlFor="total_semesters">Total de Semestres:</FormLabel>
          <TextField
            {...register(totalSemestersKey, { valueAsNumber: true })}
            id="total_semesters"
            placeholder="Digite o total de semestres"
            type="number"
            fullWidth
            error={!!errors.total_semesters}
            helperText={
              errors.total_semesters
                ? String(errors.total_semesters.message)
                : ''
            }
          />
        </Box>
      </Box>

      <Box sx={{ width: '100%' }}>{children}</Box>
    </Box>
  );
}
