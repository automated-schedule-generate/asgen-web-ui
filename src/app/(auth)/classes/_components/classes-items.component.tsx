'use client';
import { DeleteOutline, Edit, ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ConfirmDialog } from '@/components/utilities/confirm-dialog.component';
import { deleteClass } from '../_services/classes.service';
interface ClassesItemsComponentProps {
  id: string;
  identify: string;
  shift: string;
  course: string;
  course_semester: number;
  semester: string;
}
export default function ClassesItems({
  id,
  identify,
  shift,
  course,
  course_semester,
  semester,
}: ClassesItemsComponentProps) {
  const router = useRouter();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  async function handleDelete(id: string) {
    console.log('id:', id);
    await deleteClass(id);
    setConfirmDeleteOpen(false);
    router.refresh();
  }
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          className="flex flex-row content-center"
        >
          <Box
            className="flex items-center w-full"
            sx={{ color: 'secondary.main', fontWeight: 600 }}
          >
            {identify}
          </Box>
          <Box className="flex flex-row gap-2 cursor-pointer m-2">
            <Box
              aria-label="Editar turma"
              onClick={(event) => {
                event.stopPropagation();
                router.push(`/classes/${id}`);
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
            <p>Curso: {course}</p>
            <p>Período: {course_semester}</p>
            <p>Turno: {shift}</p>
            <p>Semestre: {semester}</p>
          </Box>
        </AccordionDetails>
      </Accordion>
      <ConfirmDialog
        open={confirmDeleteOpen}
        content={`Tem certeza que deseja excluir a turma ${identify}?`}
        title="Excluir Turma"
        onConfirm={() => handleDelete(id)}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </>
  );
}
