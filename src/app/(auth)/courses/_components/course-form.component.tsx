'use client';

import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { CourseType } from '../_schemas/course.schema';

interface CourseFormProps {
  formMethods: UseFormReturn<CourseType>;
  onSubmit: (data: CourseType) => Promise<void>;
  onCancel: () => void;
}

export function CourseForm({
  formMethods,
  onSubmit,
  onCancel,
}: CourseFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nome do Curso"
                size="small"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>Tempo de Aula</InputLabel>
              <Controller
                name="class_time"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Tempo de Aula">
                    <MenuItem value="45">45 min</MenuItem>
                    <MenuItem value="60">60 min</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
            <Controller
              name="total_semesters"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Semestres"
                  type="number"
                  size="small"
                  fullWidth
                  error={!!errors.total_semesters}
                />
              )}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onCancel} sx={{ fontWeight: 700 }}>
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ bgcolor: '#0B0A7A', fontWeight: 700 }}
        >
          Criar Curso
        </Button>
      </DialogActions>
    </form>
  );
}
