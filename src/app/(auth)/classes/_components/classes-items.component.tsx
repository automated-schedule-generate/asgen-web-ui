'use client';
import { DeleteOutline, Edit, ExpandMore, Groups } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteClass } from '../_services/classes.service';
import { toast } from 'react-toastify';
import { ConfirmDialogBlue } from '@/components/utilities/confirm-dialog-blue.component';
interface ClassesItemsComponentProps {
  id: string;
  identify: string;
  shift: string;
  course: string;
  course_semester: number;
  semester: string;
  onDelete: () => void;
}
export default function ClassesItems({
  id,
  identify,
  shift,
  course,
  course_semester,
  semester,
  onDelete,
}: ClassesItemsComponentProps) {
  const router = useRouter();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  async function handleDelete(id: string) {
    const toastId = toast.loading('Excluindo turma...');
    try {
      await deleteClass(id);
      toast.update(toastId, {
        type: 'success',
        render: 'Turma excluída com sucesso!',
        isLoading: false,
        autoClose: 1500,
      });
      setConfirmDeleteOpen(false);
      onDelete();
    } catch {
      toast.update(toastId, {
        type: 'error',
        render: 'Erro ao excluir turma!',
        isLoading: false,
        autoClose: 1000,
      });
    }
  }
  return (
    <>
      <Accordion
        sx={{
          borderRadius: '0.8rem',
          border: '1px solid #cbd5e1',
          '&:before': { display: 'none' },
        }}
        square={true}
        elevation={0}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          className="flex flex-row content-center"
          sx={{
            minHeight: '4rem !important',
            '&.Mui-expanded': {
              height: '1rem',
              backgroundColor: 'secondary.main',
              borderRadius: '8px 8px 0 0',
              '& .MuiSvgIcon-root': {
                color: 'white',
              },
              '& .MuiTypography-root': {
                color: 'white !important',
              },
            },
          }}
        >
          <Box
            className="flex items-center w-full gap-4"
            sx={{ color: 'secondary.main', fontWeight: 600 }}
          >
            <Groups />
            <Typography>{identify}</Typography>
          </Box>
          <Box className="flex flex-row gap-2 cursor-pointer m-2">
            <Box
              aria-label="Editar turma"
              onClick={(event) => {
                event.stopPropagation();
                router.push(`/classes/${id}/edit`);
              }}
            >
              <Edit color="secondary" />
            </Box>
            <Box
              aria-label="Deletar turma"
              onClick={(event) => {
                event.stopPropagation();
                setConfirmDeleteOpen(true);
              }}
            >
              <DeleteOutline color="error" />
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="flex flex-col gap-2">
            <Typography variant="body1">Curso: {course}</Typography>
            <Typography variant="body1">Período: {course_semester}</Typography>
            <Typography variant="body1">Turno: {shift}</Typography>
            <Typography variant="body1">Semestre: {semester}</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
      <ConfirmDialogBlue
        open={confirmDeleteOpen}
        content={`Tem certeza que deseja excluir a turma ${identify}?`}
        title="Excluir Turma"
        onConfirm={() => handleDelete(id)}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </>
  );
}
