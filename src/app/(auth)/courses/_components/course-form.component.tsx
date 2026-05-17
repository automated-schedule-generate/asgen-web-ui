'use client';

import { Controller, UseFormReturn } from 'react-hook-form';
import { Box, TextField, Button, MenuItem } from '@mui/material';
import { CourseType } from '../_schemas/course.schema';

interface CourseFormProps {
  formMethods: UseFormReturn<CourseType>;
  onSubmit: (data: CourseType) => Promise<void>;
  onCancel: () => void;
  isEdit: boolean; // <-- Nova propriedade exigida pelo Guilherme
}

export function CourseForm({
  formMethods,
  onSubmit,
  onCancel,
  isEdit,
}: CourseFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = formMethods;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'col', gap: 2, p: 2 }}
    >
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Nome do Curso"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Controller
          name="class_time"
          control={control}
          render={({ field }) => (
            <TextField {...field} select label="Tempo de Aula" fullWidth>
              <MenuItem value="45">45 min</MenuItem>
              <MenuItem value="60">60 min</MenuItem>
            </TextField>
          )}
        />

        <Controller
          name="total_semesters"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="number"
              label="Semestres"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1, mt: 2 }}>
        <Button
          onClick={onCancel}
          variant="text"
          sx={{ color: '#64748b', fontWeight: 700 }}
        >
          CANCELAR
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{ bgcolor: '#0B0A7A', fontWeight: 700 }}
        >
          {isEdit ? 'ATUALIZAR CURSO' : 'CRIAR CURSO'}{' '}
          {/* <-- Alterna o texto dinamicamente */}
        </Button>
      </Box>
    </Box>
  );
}
