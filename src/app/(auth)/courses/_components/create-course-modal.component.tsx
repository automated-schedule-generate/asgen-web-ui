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
import { Cancel, Send, Add as AddIcon } from '@mui/icons-material';
import { courseSchema, CourseType } from '../_schemas/course.schema';
import { CourseForm } from './course-form.component';
import { createCourse } from '../_services/courses.service';

interface CreateCourseModalProps {
  onRefresh: () => Promise<void>;
}

export function CreateCourseModal({ onRefresh }: CreateCourseModalProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    reset();
    setIsOpen(false);
  };

  const handleCreateSubmit = async (data: FieldValues) => {
    setSubmitting(true);
    try {
      await createCourse(data as unknown as CourseType);
      reset();
      await onRefresh();
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao criar curso:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{
          bgcolor: '#0B0A7A',
          '&:hover': { bgcolor: '#060554' },
          borderRadius: '4px',
          px: 3,
          fontWeight: 700,
          textTransform: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Novo Curso
      </Button>

      <Dialog open={isOpen} onClose={handleCancel} fullWidth maxWidth="sm">
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
                disabled={!isValid || submitting}
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
    </>
  );
}
