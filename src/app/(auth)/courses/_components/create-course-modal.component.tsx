'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Cancel, Save, Add as AddIcon } from '@mui/icons-material';
import { courseSchema, CourseType } from '../_schemas/course.schema';
import { CourseForm } from './course-form.component';
import { createCourse } from '../_services/courses.service';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';
import { ConfirmDialogBlue } from '@/components/utilities/confirm-dialog-blue.component';
import { toast } from 'react-toastify';

interface CreateCourseModalProps {
  onRefresh: () => Promise<void>;
}

export function CreateCourseModal({ onRefresh }: CreateCourseModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const formMethods = useFormWithZod(courseSchema);

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  const handleCancel = () => setConfirmOpen(true);

  const handleConfirm = () => {
    reset();
    setIsOpen(false);
    setConfirmOpen(false);
  };

  const handleCreateSubmit = async (data: CourseType) => {
    setSubmitting(true);
    const toastId = toast.loading('Criando curso...');
    try {
      await createCourse(data);
      reset();
      await onRefresh();
      setIsOpen(false);
      toast.update(toastId, {
        render: 'Curso criado com sucesso!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Erro ao criar curso:', error);
      toast.update(toastId, {
        render: 'Erro ao criar curso',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        color="secondary"
        onClick={() => setIsOpen(true)}
      >
        Novo Curso
      </Button>

      <Dialog open={isOpen} onClose={handleCancel} fullWidth maxWidth="sm">
        <DialogTitle>Novo Curso</DialogTitle>
        <form
          onSubmit={handleSubmit(handleCreateSubmit)}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <DialogContent dividers>
            <CourseForm
              formMethods={formMethods}
              onSubmit={handleSubmit(handleCreateSubmit)}
              asDiv
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="button"
              variant="contained"
              color="error"
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
              endIcon={<Save />}
            >
              {submitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <ConfirmDialogBlue
        open={confirmOpen}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
        title="Cancelar"
        content="Tem certeza de que deseja cancelar? Se confirmar, seu progresso não será salvo."
      />
    </>
  );
}
