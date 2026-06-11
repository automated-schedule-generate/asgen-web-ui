'use client';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TablePaginationActions,
  TableRow,
  Typography,
} from '@mui/material';

import type { Teacher } from '../../_types/teacher-list.type';
import React from 'react';
import { Add } from '@mui/icons-material';
import { Subject } from '@/app/(auth)/subjects/_interfaces/subject.interface';
import { Semester } from '@/app/(auth)/semesters/_interfaces/semester.interface';
import { AddTeacherSubjectsComponent } from './add-teacher-subjects.component';

export function TeacherDetailsComponent({
  teacher,
  availableSubjects,
  semesters,
}: {
  teacher: (Teacher & { subjects?: Subject[] }) | null;
  availableSubjects: Subject[];
  semesters: Semester[];
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [addSubject, setAddSubject] = React.useState(false);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Box>
      <Typography variant="body1">Nome: {teacher?.user?.name}</Typography>
      <Typography variant="body1">
        Carga horária: {teacher?.workload}
      </Typography>
      <Box mt={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Disciplinas Atribuídas </Typography>
          {!addSubject && (
            <Button
              startIcon={<Add />}
              color="secondary"
              variant="contained"
              onClick={() => setAddSubject((prev) => !prev)}
            >
              Atribuir disciplinas{' '}
            </Button>
          )}
        </Box>
        {addSubject && (
          <AddTeacherSubjectsComponent
            availableSubjects={availableSubjects}
            semesters={semesters}
            teacher_id={teacher?.user_id ?? ''}
            onClose={() => setAddSubject(false)}
          />
        )}

        <TableContainer component={Paper} elevation={1} sx={{ mt: 2 }}>
          {teacher?.subjects?.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                py: 8,
                border: '1px dashed #cbd5e1',
                borderRadius: '4px',
                bgcolor: '#f8fafc',
              }}
            >
              <Typography sx={{ color: '#64748b', fontWeight: 500 }}>
                Nenhuma disciplina atribuída
              </Typography>
            </Box>
          ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  {['Nome', 'Carga Horária', 'Curso', 'Ações'].map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: 'secondary.main',
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {teacher?.subjects
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell>{subject.name}</TableCell>
                      <TableCell>{subject.workload}</TableCell>
                      <TableCell>{subject.course.name}</TableCell>
                      <TableCell>
                        <Button color="error" variant="contained" size="small">
                          Remover
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'Todos', value: -1 },
                    ]}
                    colSpan={4}
                    count={teacher?.subjects?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    labelRowsPerPage="Disciplinas por página:"
                    slotProps={{
                      select: { native: true },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          )}
        </TableContainer>
      </Box>
    </Box>
  );
}
