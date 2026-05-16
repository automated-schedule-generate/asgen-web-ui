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
  KeyboardArrowRight,
  School as SchoolIcon,
} from '@mui/icons-material';
import { CourseData, Subject } from '../_types/course.types';

// Importa a função do service de subjects conforme exigência do Guilherme
import { getAllSubjectsByCourse } from '../../subjects/_services/subjects.service';

interface CourseItemProps {
  course: CourseData;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: (id: string) => void;
  onDeleteSubject: (subjectId: string) => Promise<void>;
  index: number;
}

export function CourseItem({
  course,
  isExpanded,
  onToggle,
  onDelete,
  onDeleteSubject,
  index,
}: CourseItemProps) {
  const isEven = index % 2 === 0;
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);

  // Busca as disciplinas isoladamente usando o endpoint corrigido pela Claudiane
  const fetchSubjects = useCallback(async () => {
    if (!course.id) return;

    setLoading(true);
    try {
      const res = await getAllSubjectsByCourse(course.id);
      // Padrão estrito da API: data.items
      setSubjects(res?.data?.items || []);
    } catch (e) {
      console.error('Erro ao buscar disciplinas:', e);
    } finally {
      setLoading(false);
    }
  }, [course.id]);

  const handleToggleClick = () => {
    onToggle();
    if (!isExpanded) {
      fetchSubjects();
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
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 800, lineHeight: 1.1, fontSize: '0.9rem' }}
            >
              {course.name}
            </Typography>
          </Box>
        </Box>

        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(course.id);
          }}
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
                  <TableCell sx={{ fontWeight: 800, py: 1, color: '#0B0A7A' }}>
                    Disciplina
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 800, py: 1, color: '#0B0A7A' }}
                  >
                    Ação
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={2} align="center" sx={{ py: 3 }}>
                      <CircularProgress
                        size={24}
                        thickness={5}
                        sx={{ color: '#0B0A7A' }}
                      />
                    </TableCell>
                  </TableRow>
                ) : subjects.length > 0 ? (
                  subjects.map((sub, idx) => (
                    <TableRow key={sub.id || idx} hover>
                      <TableCell sx={{ py: 1, fontWeight: 500 }}>
                        {sub.name || sub.nome || sub.titulo}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={async (e) => {
                            e.stopPropagation();
                            await onDeleteSubject(sub.id);
                            // Conforme revisão do Guilherme: refaz a requisição para atualizar os dados em tela
                            fetchSubjects();
                          }}
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
