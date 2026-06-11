'use client';
import { Edit, ExpandMore, Attribution } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Skeleton,
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
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Teacher } from '../../_types/teacher-list.type';
import { getTeacherById } from '../../_services/teacher.service';
import { getAllSubjects } from '@/app/(auth)/subjects/_services/subjects.service';
import { Subject } from '@/app/(auth)/subjects/_interfaces/subject.interface';
import { PreferenceDaysTable } from '../preference-days-table.component';
export function TeachersItem({ teacher_id }: { teacher_id: string }) {
  const router = useRouter();
  const [teacher, setTeacher] = useState<
    (Teacher & { subjects?: Subject[] }) | null
  >(null);
  const [morningPreferences, setMorningPreferences] = useState<boolean[]>(
    new Array(5).fill(false),
  );
  const [afternoonPreferences, setAfternoonPreferences] = useState<boolean[]>(
    new Array(5).fill(false),
  );

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

        const preferences = teacher.preferences;
        const morningValues = new Array(5).fill(false);
        const afternoonValues = new Array(5).fill(false);
        for (const item of preferences) {
          const dayIndex = parseInt(item.day);
          if (dayIndex < 0 || dayIndex > 4) continue;
          const isSelected = !!(
            item.preferenceTimes && item.preferenceTimes.length > 0
          );
          if (item.turn === 'morning') morningValues[dayIndex] = isSelected;
          else if (item.turn === 'afternoon')
            afternoonValues[dayIndex] = isSelected;
        }
        setMorningPreferences(morningValues);
        setAfternoonPreferences(afternoonValues);
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
  }, [teacher_id]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const tableHeaders = ['Nome', 'Carga Horária', 'Curso'];

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
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
    return (
      <Skeleton
        variant="rounded"
        height={64}
        sx={{ borderRadius: '0.8rem', border: '1px solid #cbd5e1' }}
      />
    );
  }

  return (
    <>
      <Accordion
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
                router.push(`/teachers/${teacher_id}/edit`);
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
                Disciplinas Atribuídas
              </Typography>

              <TableContainer component={Paper} elevation={1}>
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
                      {teacher?.subjects
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                        .map((subject: Subject) => (
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
            <Box mt={2}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Dias de preferência
              </Typography>
              <PreferenceDaysTable
                disabled={true}
                initialMorning={morningPreferences}
                initialAfternoon={afternoonPreferences}
              />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
