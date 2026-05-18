'use client';

import React from 'react';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { Box, TextField, MenuItem } from '@mui/material';

interface CourseFormProps<T extends FieldValues> {
  formMethods: UseFormReturn<T, unknown, unknown>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  children?: React.ReactNode;
}

export function CourseForm<T extends FieldValues>({
  formMethods,
  onSubmit,
  children,
}: CourseFormProps<T>) {
  const {
    register,
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
        gap: 3,
      }}
    >
      <TextField
        {...register(nameKey)}
        label="Nome do Curso"
        fullWidth
        error={!!errors.name}
        helperText={errors.name ? String(errors.name.message) : ''}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          width: '100%',
        }}
      >
        <Box sx={{ flex: 1, width: '100%' }}>
          <TextField
            {...register(classTimeKey)}
            select
            label="Tempo da Aula"
            fullWidth
            defaultValue="45"
            error={!!errors.class_time}
            helperText={
              errors.class_time ? String(errors.class_time.message) : ''
            }
          >
            <MenuItem value="45">45 minutos</MenuItem>
            <MenuItem value="60">60 minutos</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ flex: 1, width: '100%' }}>
          <TextField
            {...register(totalSemestersKey, { valueAsNumber: true })}
            label="Total de Semestres"
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
