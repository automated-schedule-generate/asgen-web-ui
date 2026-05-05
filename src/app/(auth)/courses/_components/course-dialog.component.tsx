'use client';

import React from 'react';
import {
  Controller,
  Control,
  FieldErrors,
  SubmitHandler,
} from 'react-hook-form';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { CourseType } from '../_schemas/course.schema';

interface CourseDialogProps {
  open: boolean;
  onClose: () => void;
  control: Control<CourseType>;
  handleSubmit: (onValid: SubmitHandler<CourseType>) => () => void;
  errors: FieldErrors<CourseType>;
  onSubmit: SubmitHandler<CourseType>;
}

export function CourseDialogComponent({
  open,
  onClose,
  control,
  handleSubmit,
  errors,
  onSubmit,
}: CourseDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 700, fontSize: '1rem' }}>
        Novo Curso
      </DialogTitle>
      <DialogContent dividers>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pt: 1 }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nome"
                size="small"
                fullWidth
                error={!!errors.name}
              />
            )}
          />
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>Tempo</InputLabel>
              <Controller
                name="class_time"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Tempo">
                    <MenuItem value="45">45m</MenuItem>
                    <MenuItem value="60">60m</MenuItem>
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
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value, 10) || 0)
                  }
                />
              )}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 1.5 }}>
        <Button size="small" onClick={onClose}>
          Sair
        </Button>
        <Button
          size="small"
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          sx={{ bgcolor: '#0B0A7A' }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
