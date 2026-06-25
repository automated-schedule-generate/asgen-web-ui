'use client';

import {
  DeleteOutline,
  Edit,
  ExpandMore,
  SquareFoot,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import { deleteSubject } from '../_services/subjects.service';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ConfirmDialogBlue } from '@/components/utilities/confirm-dialog-blue.component';
import { toast } from 'react-toastify';

interface SubjectsItemsComponentProps {
  id: string;
  name: string;
  workload: number;
  is_optional: string;
  prerequisite?: string;
  teacher?: string;
  course: string;
  onRefresh: () => void;
}

export default function SubjectsItems({
  course,
  id,
  name,
  workload,
  is_optional,
  prerequisite,
  teacher,
  onRefresh,
}: SubjectsItemsComponentProps) {
  const router = useRouter();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  async function handleDelete(id: string) {
    const toastId = toast.loading('Excluindo disciplina...');
    try {
      await deleteSubject(id);
      toast.update(toastId, {
        render: 'Disciplina excluída com sucesso!',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
      setConfirmDeleteOpen(false);
      onRefresh();
    } catch {
      setConfirmDeleteOpen(false);
      toast.update(toastId, {
        render: 'Erro ao excluir disciplina!',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
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
          sx={{
            minHeight: '4rem !important',
            '&.Mui-expanded': {
              height: '1rem',
              backgroundColor: 'secondary.main',
              borderRadius: '8px 8px 0 0',
              '& .MuiSvgIcon-root': { color: 'white' },
              '& .MuiTypography-root': { color: 'white !important' },
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              gap: 2,
              color: 'secondary.main',
              fontWeight: 600,
            }}
          >
            <SquareFoot />
            <Typography>{name}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              cursor: 'pointer',
              m: 1,
            }}
          >
            <Box
              aria-label="Editar disciplina"
              onClick={(event) => {
                event.stopPropagation();
                router.push(`/subjects/${id}/edit`);
              }}
            >
              <Edit color="secondary" />
            </Box>
            <Box
              aria-label="Deletar disciplina"
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2">
              <strong>Curso:</strong> {course}
            </Typography>
            <Typography variant="body2">
              <strong>Carga horária:</strong> {workload}h
            </Typography>
            <Typography variant="body2">
              <strong>Obrigatória:</strong> {is_optional}
            </Typography>
            <Typography variant="body2">
              <strong>Pré-requisito:</strong> {prerequisite}
            </Typography>
            <Typography variant="body2">
              <strong>Docente responsável:</strong> {teacher}
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      <ConfirmDialogBlue
        open={confirmDeleteOpen}
        content={`Tem certeza que deseja excluir a disciplina ${name}?`}
        title="Excluir Disciplina"
        onConfirm={() => handleDelete(id)}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </>
  );
}
