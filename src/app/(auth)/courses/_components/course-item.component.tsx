'use client';

import { useState, useCallback } from 'react';
import {
  Typography,
  Box,
  IconButton,
  CircularProgress,
  Collapse,
  ListItem,
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
  EditOutlined as EditIcon,
  KeyboardArrowRight,
  School as SchoolIcon,
} from '@mui/icons-material';
import { CourseData } from '../_types/course.types';
import { deleteCourse } from '../_services/courses.service';
import {
  getAllSubjects,
  deleteSubject,
} from '../../subjects/_services/subjects.service';
import type { SubjectType } from '../../subjects/_schemas/subject.schema';

interface CourseItemProps {
  course: CourseData;
  isExpanded: boolean;
  onToggle: () => void;
  onEditClick: (course: CourseData) => void;
  onRefresh: () => Promise<void>;
  index: number;
}

export function CourseItem({
  course,
  isExpanded,
  onToggle,
  onEditClick,
  onRefresh,
  index,
}: CourseItemProps) {
  const isEven = index % 2 === 0;
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSubjects = useCallback(async () => {
    if (!course.id) return;
    setLoading(true);
    try {
      const res = await getAllSubjects({
        course_id: course.id,
        with_course: false,
        with_pagination: false,
      });

      const items = res?.data?.items || res?.items || res?.data || [];
      setSubjects(Array.isArray(items) ? items : []);
    } catch (e) {
      console.error('Erro ao carregar disciplinas:', e);
    } finally {
      setLoading(false);
    }
  }, [course.id]);

  const handleToggleClick = () => {
    onToggle();
    if (!isExpanded) fetchSubjects();
  };

  const handleDeleteCourseClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Deseja realmente excluir este curso?')) {
      try {
        await deleteCourse(course.id);
        await onRefresh();
      } catch (err) {
        console.error('Erro ao deletar curso:', err);
      }
    }
  };

  const handleDeleteSubjectClick = async (subjectId: string) => {
    if (window.confirm('Deseja realmente excluir esta disciplina?')) {
      try {
        await deleteSubject(subjectId);
        await fetchSubjects();
      } catch (err) {
        console.error('Erro ao deletar disciplina:', err);
      }
    }
  };

  return (
    <Box sx={{ borderBottom: '2px solid #cbd5e1' }}>
      <ListItem
        onClick={handleToggleClick}
        sx={{
          py: 1.8,
          px: 2,
          cursor: 'pointer',
          bgcolor: isExpanded ? '#0B0A7A' : isEven ? '#ffffff' : '#f8fafc',
          color: isExpanded ? '#fff' : '#0B0A7A',
          transition: 'all 0.2s ease',
          borderLeft: isExpanded
            ? '6px solid #3b82f6'
            : '6px solid transparent',
          '&:hover': { bgcolor: isExpanded ? '#0B0A7A' : '#f1f5f9' },
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}
        >
          <SchoolIcon sx={{ fontSize: 20, opacity: 0.8 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
            {course.name}
          </Typography>
        </Box>

        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onEditClick(course);
          }}
          sx={{ color: 'inherit', mr: 0.5 }}
        >
          <EditIcon sx={{ fontSize: 20 }} />
        </IconButton>

        <IconButton
          size="small"
          onClick={handleDeleteCourseClick}
          sx={{ color: 'inherit', mr: 1 }}
        >
          <DeleteIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <KeyboardArrowRight
          sx={{
            transform: isExpanded ? 'rotate(90deg)' : '0',
            transition: '0.3s',
          }}
        />
      </ListItem>

      <Collapse in={isExpanded} unmountOnExit>
        <Box sx={{ p: 2, bgcolor: '#f1f5f9' }}>
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
                    <TableRow key={sub.id || idx} hover>
                      <TableCell sx={{ py: 1, fontWeight: 500 }}>
                        {sub.name}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteSubjectClick(sub.id!)}
                        >
                          <DeleteIcon sx={{ fontSize: 16 }} />
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
  );
}
