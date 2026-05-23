'use client';

import { useState } from 'react';
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
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';
import { ConfirmDialog } from '@/components/utilities/confirm-dialog.component';

interface CreateCourseModalProps {
  onRefresh: () => Promise<void>;
}

export function CreateCourseModal({ onRefresh }: CreateCourseModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingData, setPendingData] = useState<CourseType | null>(null);

  const formMethods = useFormWithZod(courseSchema, {
    defaultValues: {
      class_time: '45',
      total_semesters: 1,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  const handleOpen = () => setIsOpen(true);

  const handleCancel = () => {
    reset();
    setIsOpen(false);
  };

  const handleCreateSubmit = async (data: CourseType) => {
    setPendingData(data);
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!pendingData) return;
    setSubmitting(true);
    try {
      await createCourse(pendingData);
      reset();
      await onRefresh();
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao criar curso:', error);
    } finally {
      setSubmitting(false);
      setConfirmOpen(false);
      setPendingData(null);
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

      <ConfirmDialog
        open={confirmOpen}
        title="Criar Curso"
        content="Tem certeza que deseja criar este curso?"
        onConfirm={handleConfirm}
        onCancel={() => {
          setConfirmOpen(false);
          setPendingData(null);
        }}
      />
    </>
  );
}
