'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Cancel, Send } from '@mui/icons-material';
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
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const formMethods = useForm({
    resolver: zodResolver(courseSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      class_time: '45',
      total_semesters: 1,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  const handleCancel = () => {
    reset();
    onClose();
  };

  const handleCreateSubmit = async (data: FieldValues) => {
    setSubmitting(true);
    try {
      await createCourse(data as unknown as CourseType);
      reset();
      await onRefresh();
      onClose();
    } catch (error) {
      console.error('Erro ao criar curso:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 700, color: '#0B0A7A' }}>
        Novo Curso
      </DialogTitle>
      <DialogContent dividers>
        <CourseForm
          formMethods={formMethods}
          onSubmit={handleSubmit(handleCreateSubmit)}
        >
          <DialogActions sx={{ px: 0, mt: 1, justifyContent: 'end', gap: 2 }}>
            <Button
              type="button"
              variant="outlined"
              color="error"
              className="self-end"
              startIcon={<Cancel />}
              onClick={handleCancel}
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
              {submitting ? 'Enviando...' : 'Enviar'}
            </Button>
          </DialogActions>
        </CourseForm>
      </DialogContent>
    </Dialog>
  );
}
