'use client';
import {
  DeleteOutline,
  Edit,
  ExpandMore,
  Add,
  SquareFoot,
  Attribution,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Icon,
  listItemSecondaryActionClasses,
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
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ConfirmDialog } from '@/components/utilities/confirm-dialog.component';
import { Teacher } from '../../_types/teacher-list.type';
import { deleteTeacher, getTeacherById } from '../../_services/teacher.service';
import { getAllSubjects } from '@/app/(auth)/subjects/_services/subjects.service';
import { Subject } from '@/app/(auth)/subjects/_interfaces/subject.interface';

export function TeachersItem({ teacher_id }: { teacher_id: string }) {
  async function handleDelete(id: string) {
    try {
      await deleteTeacher(id);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  const router = useRouter();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [teacher, setTeacher] = useState<
    (Teacher & { subjects?: Subject[] }) | null
  >(null);

  useEffect(() => {
    async function loadData() {
      try {
        const teacherData = await getTeacherById(teacher_id);
        const subjectsData = await getAllSubjects({
          with_course: true,
          with_pagination: false,
          with_prerequisite: false,
        });
        const teacherSubjects = (
          subjectsData?.data?.items as Subject[]
        )?.filter((subject) =>
          subject.teachers?.some((t) => t.user_id === teacher_id),
        );
        const teacher = teacherData?.data
          ? {
              ...teacherData.data,
              subjects: teacherSubjects,
            }
          : null;
        setTeacher(teacher);
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const tableHeaders = ['Nome', 'Carga Horária', 'Curso'];

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

  if (!teacher) {
    return null;
  }

  return (
    <>
      <Accordion
        sx={{ borderRadius: '0.8rem', '&:before': { display: 'none' } }}
        square={true}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          className="flex flex-row content-center"
          sx={{
            minHeight: '4rem !important',
            '&.Mui-expanded': {
              backgroundColor: 'secondary.main',
              borderRadius: '8px 8px 0 0',
              '& .MuiSvgIcon-root': {
                color: 'white',
              },
              '& .MuiTypography-root': {
                color: 'white !important',
              },
            },
          }}
        >
          <Box
            className="flex items-center w-full gap-2"
            sx={{ color: 'secondary.main', fontWeight: 600 }}
          >
            <Attribution />
            <Typography>{teacher?.user?.name}</Typography>
          </Box>
          <Box className="flex flex-row gap-2 cursor-pointer m-2">
            <Box
              aria-label="Editar professor"
              onClick={(event) => {
                event.stopPropagation();
                router.push(`/teachers/${teacher_id}`);
              }}
            >
              <Edit color="secondary" />
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography variant="body1">
              Carga horária: {teacher?.workload}
            </Typography>
            <Box mt={2}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Disciplinas Atribuídas{' '}
              </Typography>

              <TableContainer component={Paper} elevation={1}>
                {teacher?.subjects?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      sx={{ textAlign: 'center', height: '20vh' }}
                    >
                      Nenhuma disciplina atribuída
                    </TableCell>
                  </TableRow>
                ) : (
                  <Table size="small">
                    <TableHead>
                      {tableHeaders.map((header) => (
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
                    </TableHead>
                    <TableBody>
                      {teacher?.subjects?.map((subject: Subject) => (
                        <TableRow key={subject.id}>
                          <TableCell>{subject.name}</TableCell>
                          <TableCell>{subject.workload}</TableCell>
                          <TableCell>{subject.course.name}</TableCell>
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
                          slotProps={{
                            select: {
                              native: true,
                            },
                          }}
                          labelRowsPerPage="Disciplinas por página:"
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
        </AccordionDetails>
      </Accordion>
      <ConfirmDialog
        open={confirmDeleteOpen}
        content={`Tem certeza que deseja excluir o professor ${teacher?.user?.name}?`}
        title="Excluir Professor"
        onConfirm={() => handleDelete(teacher_id)}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </>
  );
}
