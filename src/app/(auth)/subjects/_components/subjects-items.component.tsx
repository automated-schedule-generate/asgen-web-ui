'use client';
import { DeleteOutline, Edit, ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material';
import { deleteSubject } from '../_services/subjects.service';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ConfirmDialog } from '@/components/utilities/confirm-dialog.component';
interface SubjectsItemsComponentProps {
  id: string;
  name: string;
  workload: number;
  is_optional: string;
  prerequisite?: string;
  teacher?: string;
  course: string;
}
export default function SubjectsItems({
  course,
  id,
  name,
  workload,
  is_optional,
  prerequisite,
  teacher,
}: SubjectsItemsComponentProps) {
  async function handleDelete(id: string) {
    console.log('id:', id);
    await deleteSubject(id);
    window.location.reload();
  }
  const router = useRouter();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
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
            {name}
          </Box>
          <Box className="flex flex-row gap-2 cursor-pointer m-2">
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
          <Box className="flex flex-col gap-2">
            <p>Curso: {course}</p>
            <p>Carga horária: {workload}</p>
            <p>Obrigatória: {is_optional}</p>
            <p>Pré-requisito: {prerequisite}</p>
            <p>Docente responsável: {teacher}</p>
          </Box>
        </AccordionDetails>
      </Accordion>
      <ConfirmDialog
        open={confirmDeleteOpen}
        content={`Tem certeza que deseja excluir a disciplina ${name}?`}
        title="Excluir Disciplina"
        onConfirm={() => handleDelete(id)}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </>
  );
}
