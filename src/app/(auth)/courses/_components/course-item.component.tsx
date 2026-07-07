'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Typography,
  Box,
  IconButton,
  CircularProgress,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  DeleteOutline as DeleteIcon,
  Edit as EditIcon,
  KeyboardArrowRight,
  School as SchoolIcon,
} from '@mui/icons-material';
import { CourseData } from '../_types/course.types';
import { deleteCourse } from '../_services/courses.service';
import {
  getAllSubjects,
  deleteSubject,
} from '../../subjects/_services/subjects.service';
import type { Subject } from '../../subjects/_interfaces/subject.interface';
import { ConfirmDialog } from '@/components/utilities/confirm-dialog.component';

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
  const [searchSemester, setSearchSemester] = useState<string>('1');

  const fetchSubjectsBySemester = useCallback(
    async (semester: string) => {
      if (!course.id) return;
      setLoading(true);
      try {
        const res = await getAllSubjects({
          course_id: course.id,
          with_course: false,
          with_pagination: false,
          course_semester: semester ? Number(semester) : undefined,
        });
        setSubjects(res.data.items);
      } catch (e) {
        console.error('Erro ao carregar disciplinas:', e);
      } finally {
        setLoading(false);
      }
    },
    [course.id],
  );

  const fetchSubjects = useCallback(
    async (semester: string = '1') => {
      if (!course.id) return;
      setLoading(true);
      try {
        const res = await getAllSubjects({
          course_id: course.id,
          with_course: false,
          with_pagination: false,
          course_semester: Number(semester),
        });
        setSubjects(res.data.items);
      } catch (e) {
        console.error('Erro ao carregar disciplinas:', e);
      } finally {
        setLoading(false);
      }
    },
    [course.id],
  );

  const handleToggleClick = () => {
    const nextState = !isExpanded;
    setIsExpanded(nextState);
    if (nextState) fetchSubjects(searchSemester);
  };

  const handleDeleteCourseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmDeleteCourseOpen(true);
  };

  const handleDeleteSubjectClick = (subjectId: string) => {
    setSubjectToDelete(subjectId);
    setConfirmDeleteSubjectOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#fff',
          border: '1px solid #cbd5e1',
          borderRadius: '10px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          transition: 'all 0.3s ease',
        }}
      >
        <Box
          onClick={handleToggleClick}
          sx={{
            backgroundColor: isExpanded ? '#0B0A7A' : '#fff',
            color: isExpanded ? '#fff' : '#0B0A7A',
            padding: '12px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: isExpanded ? '#0B0A7A' : '#f8fafc',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SchoolIcon sx={{ color: 'inherit', fontSize: 22, opacity: 0.9 }} />
            <Typography
              sx={{ fontWeight: 700, fontSize: '1rem', color: 'inherit' }}
            >
              {course.name}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/courses/${course.id}/edit`);
              }}
              sx={{ color: 'inherit' }}
            >
              <EditIcon sx={{ fontSize: 20 }} />
            </IconButton>

            <IconButton
              size="small"
              onClick={handleDeleteCourseClick}
              sx={{
                color: isExpanded ? '#fff' : '#BD0000',
                '&:hover': {
                  backgroundColor: isExpanded
                    ? 'rgba(255,255,255,0.1)'
                    : '#fef2f2',
                },
              }}
            >
              <DeleteIcon sx={{ fontSize: 20 }} />
            </IconButton>

            <KeyboardArrowRight
              sx={{
                transform: isExpanded ? 'rotate(90deg)' : '0',
                transition: '0.3s',
                fontSize: 22,
                color: 'inherit',
                ml: 0.5,
              }}
            />
          </Box>
        </Box>

        <Collapse in={isExpanded} unmountOnExit>
          <Box sx={{ p: 2, bgcolor: '#f8fafc' }}>
            {subjects.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <TextField
                  select
                  size="small"
                  value={searchSemester}
                  onChange={(e) => {
                    setSearchSemester(e.target.value);
                    fetchSubjects(e.target.value);
                  }}
                  sx={{ bgcolor: '#fff', borderRadius: '4px', width: 200 }}
                  InputLabelProps={{ shrink: false }}
                  label=""
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (value) => {
                      if (!value)
                        return (
                          <span style={{ color: '#0B0A7A' }}>
                            Filtrar por período
                          </span>
                        );
                      return `${value}º Período`;
                    },
                  }}
                >
                  {Array.from(
                    { length: Number(course.total_semesters) },
                    (_, i) => (
                      <MenuItem key={i + 1} value={String(i + 1)}>
                        {i + 1}º Período
                      </MenuItem>
                    ),
                  )}
                </TextField>
              </Box>
            )}
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{ border: '1px solid #cbd5e1', borderRadius: 1.5 }}
            >
              <Table size="small">
                <TableHead sx={{ bgcolor: '#e2e8f0' }}>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 800,
                        color: '#0B0A7A',
                        textAlign: 'left !important',
                      }}
                    >
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
                          align="left"
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
                            <DeleteIcon
                              sx={{ color: '#BD0000', fontSize: 18 }}
                            />
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
          </Box>
        </Collapse>
      </Box>

      <ConfirmDialog
        open={confirmDeleteCourseOpen}
        title="Excluir Curso"
        content={`Tem certeza que deseja excluir o curso ${course.name}?`}
        onConfirm={async () => {
          try {
            await deleteCourse(course.id);
            await onRefresh();
          } catch (err) {
            console.error('Erro ao deletar curso:', err);
          } finally {
            setConfirmDeleteCourseOpen(false);
          }
        }}
        onCancel={() => setConfirmDeleteCourseOpen(false)}
      />

      <ConfirmDialog
        open={confirmDeleteSubjectOpen}
        title="Excluir Disciplina"
        content="Tem certeza que deseja excluir esta disciplina?"
        onConfirm={async () => {
          try {
            if (subjectToDelete) {
              await deleteSubject(subjectToDelete);
              await fetchSubjects();
            }
          } catch (err) {
            console.error('Erro ao deletar disciplina:', err);
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
