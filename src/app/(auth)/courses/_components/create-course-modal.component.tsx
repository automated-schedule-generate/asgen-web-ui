'use client';

import { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

import { courseSchema, CourseType } from '../_schemas/course.schema';
import { CourseForm } from './course-form.component';
import { createCourse } from '../_services/courses.service';

interface CreateCourseModalProps {
  open: boolean;
  onClose: () => void;
  onRefresh: () => Promise<void>;
}

export function CreateCourseModal({
  open,
  onClose,
  onRefresh,
}: CreateCourseModalProps) {
  const [submitting, setSubmitting] = useState(false);

  const formMethods = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: '',
      class_time: '45',
      total_semesters: 1,
    },
  });

  const handleCreateSubmit = async (data: FieldValues) => {
    setSubmitting(true);
    try {
      await createCourse(data as unknown as CourseType);
      formMethods.reset();
      await onRefresh();
      onClose();
    } catch (error) {
      console.error('Erro ao criar curso:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 700, color: '#0B0A7A' }}>
        Novo Curso
      </DialogTitle>
      <DialogContent dividers>
        <CourseForm
          formMethods={formMethods}
          onSubmit={formMethods.handleSubmit(handleCreateSubmit)}
        >
          <DialogActions sx={{ px: 0, mt: 1, justifyContent: 'end', gap: 2 }}>
            <Button onClick={onClose} disabled={submitting} color="inherit">
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              sx={{
                bgcolor: '#0B0A7A',
                '&:hover': { bgcolor: '#060554' },
                borderRadius: '50px',
                textTransform: 'none',
                fontWeight: 700,
                px: 3,
              }}
            >
              {submitting ? 'Salvando...' : 'Criar Curso'}
            </Button>
          </DialogActions>
        </CourseForm>
      </DialogContent>
    </Dialog>
  );
}
