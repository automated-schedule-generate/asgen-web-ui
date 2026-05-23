'use client';

import React from 'react';
import { UseFormReturn, FieldValues, Path, Controller } from 'react-hook-form';
import { Box, FormLabel, Autocomplete, TextField } from '@mui/material';
import { ClassTimeEnum } from '../_enums/course.enum';
import { FormInput } from '@/components/utilities/form-input.component';

interface CourseFormProps<T extends FieldValues> {
  formMethods: UseFormReturn<T>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  children?: React.ReactNode;
}

const classTimeOptions = Object.values(ClassTimeEnum).map((val) => ({
  label: `${val} minutos`,
  value: val,
}));

export function CourseForm<T extends FieldValues>({
  formMethods,
  onSubmit,
  children,
}: CourseFormProps<T>) {
  const {
    control,
    formState: { errors },
  } = formMethods;

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
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column' },
          gap: 3,
          width: '100%',
          mt: 0.75,
        }}
      >
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <FormLabel htmlFor="class_time">Carga Horária:</FormLabel>
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
                sx={{ width: 300 }}
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

        <Box
          sx={{ flex: 1, width: 300, display: 'flex', flexDirection: 'column' }}
        >
          <FormInput<T>
            control={control}
            id="total_semesters"
            name="total_semesters"
            type="number"
            label="Total de Semestres:"
            placeholder="Digite o total de semestres"
          />
        </Box>
      </Box>

      <Box sx={{ width: '100%' }}>{children}</Box>
    </Box>
  );
}
