'use client';

import React from 'react';
import {
  Box,
  Chip,
  Collapse,
  IconButton,
  ListItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  DeleteOutline as DeleteIcon,
  KeyboardArrowRight,
  School as SchoolIcon,
} from '@mui/icons-material';
import { CourseData, Subject } from '../_types/course.types';

interface CourseItemProps {
  course: CourseData;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: (id: string) => void;
  subjects: Subject[];
  subjectsLoading: boolean;
  subjectPage: number;
  onSubjectPageChange: (value: number) => void;
}

const getTypeColor = (t: string) =>
  ({ INTEGRADO: '#2E7D32', SUBSEQUENTE: '#ED6C02', SUPERIOR: '#1976D2' })[t] ||
  '#757575';

export function CourseItemComponent({
  course,
  isExpanded,
  onToggle,
  onDelete,
  subjects,
  subjectsLoading,
  subjectPage,
  onSubjectPageChange,
}: CourseItemProps) {
  const subjectsPerPage = 5;
  const paginatedSubjects = subjects.slice(
    (subjectPage - 1) * subjectsPerPage,
    subjectPage * subjectsPerPage,
  );
  const subjectTotalPages = Math.max(
    1,
    Math.ceil(subjects.length / subjectsPerPage),
  );

  return (
    <>
      <ListItem
        onClick={onToggle}
        sx={{
          py: 1,
          px: 2,
          cursor: 'pointer',
          bgcolor: isExpanded ? '#0B0A7A' : 'inherit',
          color: isExpanded ? '#fff' : '#0B0A7A',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}
        >
          <SchoolIcon sx={{ fontSize: 18, opacity: 0.8 }} />
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, lineHeight: 1.1, fontSize: '0.85rem' }}
            >
              {course.name}
            </Typography>
            <Chip
              label={course.type}
              size="small"
              sx={{
                height: 14,
                fontSize: '0.55rem',
                mt: 0.2,
                color: isExpanded ? '#fff' : getTypeColor(course.type),
                borderColor: isExpanded ? '#fff' : getTypeColor(course.type),
              }}
              variant="outlined"
            />
          </Box>
        </Box>

        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(course.id);
          }}
          sx={{ color: 'inherit' }}
        >
          <DeleteIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <KeyboardArrowRight
          sx={{
            transform: isExpanded ? 'rotate(90deg)' : '0',
            transition: '0.2s',
            ml: 1,
          }}
        />
      </ListItem>

      <Collapse in={isExpanded} unmountOnExit>
        <Box sx={{ p: 1, bgcolor: '#fcfcfd' }}>
          <TableContainer sx={{ border: '1px solid #eee' }}>
            <Table size="small">
              <TableHead sx={{ bgcolor: '#f1f3f7' }}>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: 700, py: 0.3, fontSize: '0.75rem' }}
                  >
                    Disciplina
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ py: 0.3, fontSize: '0.75rem' }}
                  >
                    Ação
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subjectsLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      align="center"
                      sx={{ py: 2, color: '#999' }}
                    >
                      Carregando disciplinas...
                    </TableCell>
                  </TableRow>
                ) : paginatedSubjects.length > 0 ? (
                  paginatedSubjects.map((subject, index) => (
                    <TableRow key={subject.id ?? `subject-${index}`} hover>
                      <TableCell sx={{ py: 0.3, fontSize: '0.75rem' }}>
                        {subject.name || subject.titulo || subject.nome}
                      </TableCell>
                      <TableCell align="right" sx={{ py: 0.3 }}>
                        <IconButton size="small">
                          <DeleteIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      Nenhuma disciplina vinculada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {subjectTotalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Pagination
                count={subjectTotalPages}
                page={subjectPage}
                onChange={(_, value) => onSubjectPageChange(value)}
                size="small"
              />
            </Box>
          )}
        </Box>
      </Collapse>
    </>
  );
}
