'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Typography,
  Box,
  IconButton,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  DeleteOutline as DeleteIcon,
  Edit as EditIcon,
  ExpandMore,
  School as SchoolIcon,
} from '@mui/icons-material';
import { CourseData } from '../_types/course.types';
import { deleteCourse } from '../_services/courses.service';
import {
  getAllSubjects,
  deleteSubject,
} from '../../subjects/_services/subjects.service';
import type { Subject } from '../../subjects/_interfaces/subject.interface';
import { ConfirmDialogBlue } from '@/components/utilities/confirm-dialog-blue.component';
import { toast } from 'react-toastify';

interface CourseItemProps {
  course: CourseData;
  onRefresh: () => Promise<void>;
}

export function CourseItem({ course, onRefresh }: CourseItemProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);

  const [confirmDeleteCourseOpen, setConfirmDeleteCourseOpen] = useState(false);
  const [confirmDeleteSubjectOpen, setConfirmDeleteSubjectOpen] =
    useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);

  const fetchSubjects = useCallback(async () => {
    if (!course.id) return;
    setLoading(true);
    try {
      const res = await getAllSubjects({
        course_id: course.id,
        with_course: false,
        with_pagination: false,
      });
      setSubjects(res.data.items);
    } catch (e) {
      console.error('Erro ao carregar disciplinas:', e);
    } finally {
      setLoading(false);
    }
  }, [course.id]);

  const handleAccordionChange = (
    _: React.SyntheticEvent,
    expanded: boolean,
  ) => {
    setIsExpanded(expanded);
    if (expanded) fetchSubjects();
  };

  const handleDeleteSubjectClick = (subjectId: string) => {
    setSubjectToDelete(subjectId);
    setConfirmDeleteSubjectOpen(true);
  };

  return (
    <>
      <Accordion
        expanded={isExpanded}
        onChange={handleAccordionChange}
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
              '& .MuiSvgIcon-root': { color: 'white' },
              '& .MuiTypography-root': { color: 'white !important' },
            },
          }}
        >
          <Box
            className="flex items-center w-full gap-4"
            sx={{ color: 'secondary.main', fontWeight: 600 }}
          >
            <SchoolIcon />
            <Typography>{course.name}</Typography>
          </Box>
          <Box className="flex flex-row gap-2 cursor-pointer m-2">
            <Box
              aria-label="Editar curso"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/courses/${course.id}/edit`);
              }}
            >
              <EditIcon color="secondary" />
            </Box>
            <Box
              aria-label="Deletar curso"
              onClick={(e) => {
                e.stopPropagation();
                setConfirmDeleteCourseOpen(true);
              }}
            >
              <DeleteIcon color="error" />
            </Box>
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ border: '1px solid #cbd5e1', borderRadius: 1.5 }}
          >
            <Table size="small">
              <TableHead sx={{ bgcolor: '#e2e8f0' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800, color: '#0B0A7A' }}>
                    Disciplina
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 800, color: '#0B0A7A' }}
                  >
                    Ação
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={2} align="center" sx={{ py: 3 }}>
                      <CircularProgress size={24} sx={{ color: '#0B0A7A' }} />
                    </TableCell>
                  </TableRow>
                ) : subjects.length > 0 ? (
                  subjects.map((sub, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell
                        sx={{ py: 1, fontWeight: 500, color: '#334155' }}
                      >
                        {sub.name}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteSubjectClick(sub.id!)}
                          sx={{ '&:hover': { backgroundColor: '#fef2f2' } }}
                        >
                          <DeleteIcon sx={{ color: '#BD0000', fontSize: 18 }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      align="center"
                      sx={{ py: 2, color: '#64748b' }}
                    >
                      Nenhuma disciplina vinculada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      <ConfirmDialogBlue
        open={confirmDeleteCourseOpen}
        title="Excluir Curso"
        content={`Tem certeza que deseja excluir o curso ${course.name}?`}
        onConfirm={async () => {
          const toastId = toast.loading('Excluindo curso...');
          try {
            await deleteCourse(course.id);
            await onRefresh();
            toast.update(toastId, {
              render: 'Curso excluído com sucesso!',
              type: 'success',
              isLoading: false,
              autoClose: 3000,
            });
          } catch (err) {
            console.error('Erro ao deletar curso:', err);
            toast.update(toastId, {
              render: 'Erro ao excluir curso',
              type: 'error',
              isLoading: false,
              autoClose: 3000,
            });
          } finally {
            setConfirmDeleteCourseOpen(false);
          }
        }}
        onCancel={() => setConfirmDeleteCourseOpen(false)}
      />

      <ConfirmDialogBlue
        open={confirmDeleteSubjectOpen}
        title="Excluir Disciplina"
        content="Tem certeza que deseja excluir esta disciplina?"
        onConfirm={async () => {
          const toastId = toast.loading('Deletando disciplina...');
          try {
            if (subjectToDelete) {
              await deleteSubject(subjectToDelete);
              await fetchSubjects();
            }
            toast.update(toastId, {
              render: 'Disciplina deletada com sucesso!',
              type: 'success',
              isLoading: false,
              autoClose: 3000,
            });
          } catch (err) {
            console.error('Erro ao deletar disciplina:', err);
            toast.update(toastId, {
              render: 'Erro ao deletar disciplina',
              type: 'error',
              isLoading: false,
              autoClose: 3000,
            });
          } finally {
            setConfirmDeleteSubjectOpen(false);
            setSubjectToDelete(null);
          }
        }}
        onCancel={() => {
          setConfirmDeleteSubjectOpen(false);
          setSubjectToDelete(null);
        }}
      />
    </>
  );
}
