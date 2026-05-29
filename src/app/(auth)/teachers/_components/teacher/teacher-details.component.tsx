'use client';
import {
  Autocomplete,
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
  TextField,
  Typography,
} from '@mui/material';

import type { Teacher } from '../../_types/teacher-list.type';
import React from 'react';
import { Add } from '@mui/icons-material';
import { Subject } from '@/app/(auth)/subjects/_interfaces/subject.interface';

export function TeacherDetailsComponent({
  teacher,
}: {
  teacher: (Teacher & { subjects?: Subject[] }) | null;
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
          <Button
            startIcon={<Add />}
            color="secondary"
            variant="contained"
            onClick={() => setAddSubject((prev) => !prev)}
          >
            Atribuir disciplinas{' '}
          </Button>
        </Box>
        {addSubject && (
          <Box mt={2}>
            <Autocomplete
              options={teacher?.subjects || []}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Disciplinas" />
              )}
            />
          </Box>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableCell>Nome</TableCell>
              <TableCell>Carga Horária</TableCell>
              <TableCell>Curso</TableCell>
              <TableCell>Ações</TableCell>
            </TableHead>
            <TableBody>
              {teacher?.subjects?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: 'center' }}>
                    Nenhuma disciplina atribuída
                  </TableCell>
                </TableRow>
              ) : (
                teacher?.subjects?.map((subject) => (
                  <TableRow key={subject.id}>
                    <TableCell>{subject.name}</TableCell>
                    <TableCell>{subject.workload}</TableCell>
                    <TableCell>{subject.course.name}</TableCell>
                    <TableCell>
                      <Button color="error" variant="contained">
                        Remover
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={teacher?.subjects?.length || 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
