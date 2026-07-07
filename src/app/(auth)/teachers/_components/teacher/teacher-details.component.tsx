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
import { unlinkSubject } from '@/app/(auth)/subjects/_services/subjects.service';
import { useRouter } from 'next/navigation';
import { ConfirmDialogBlue } from '@/components/utilities/confirm-dialog-blue.component';
import { toast } from 'react-toastify';

type TeacherSubjectRow = Subject & {
  course_name: string;
  semester_id: string;
};

export function TeacherDetailsComponent({
  teacher,
  availableSubjects,
  semesters,
}: {
  teacher: (Teacher & { subjects?: TeacherSubjectRow[] }) | null;
  availableSubjects: Subject[];
  semesters: Semester[];
}) {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [addSubject, setAddSubject] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [subjectId, setSubjectId] = React.useState('');
  const [semesterId, setSemesterId] = React.useState('');
  const [subjectName, setSubjectName] = React.useState('');

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
  async function removeTeacherSubject(subject_id: string, semester_id: string) {
    const toastId = toast.loading('Desvinculando disciplina...');
    const payload = {
      teacher_id: teacher?.user_id ?? '',
      semester_id,
    };
    try {
      await unlinkSubject(subject_id, payload);
      toast.update(toastId, {
        render: 'Disciplina desvinculada com sucesso!',
        type: 'success',
        isLoading: false,
        autoClose: 1500,
      });
      router.refresh();
    } catch {
      toast.update(toastId, {
        render: 'Erro ao desvincular disciplina.',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    }
  }
  return (
    <Box>
      <Typography variant="body1">
        Carga horária: {teacher?.workload} horas
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
              Atribuir disciplinas
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
                        textAlign: 'start',
                        color: 'black',
                        backgroundColor: 'secondary.light',
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
                      <TableCell sx={{ textAlign: 'start' }}>
                        {subject.name}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'start' }}>
                        {subject.workload}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'start' }}>
                        {subject.course_name}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'start' }}>
                        <Button
                          color="error"
                          variant="contained"
                          size="small"
                          onClick={() => {
                            setSubjectId(subject.id);
                            setSemesterId(subject.semester_id);
                            setSubjectName(subject.name);
                            setOpenDialog(true);
                          }}
                        >
                          Desvincular
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
        <ConfirmDialogBlue
          open={openDialog}
          title="Desvincular disciplina"
          content={`Tem certeza que deseja desvincular a disciplina ${subjectName} do professor ${teacher?.user?.name}?`}
          onCancel={() => setOpenDialog(false)}
          onConfirm={() => {
            removeTeacherSubject(subjectId, semesterId);
            setOpenDialog(false);
          }}
        />
      </Box>
    </Box>
  );
}
