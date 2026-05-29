'use client';
import { Box, Typography } from '@mui/material';
import type { TeacherListType } from '../../_types/teacher-list.type';
import { TeachersItem } from './teachers-item.component';

export function TeachersListComponent({
  teachers,
  isLoading,
}: {
  teachers: TeacherListType;
  isLoading: boolean;
}) {
  return (
    <Box className="flex flex-col gap-2">
      {teachers.length === 0 && !isLoading && (
        <Box
          className="flex items-center justify-center"
          sx={{
            height: '25rem',
            backgroundColor: 'primary',
            borderRadius: '1.5rem',
            borderWidth: '1px',
            borderColor: 'primary',
          }}
        >
          <Typography variant="body2">Nenhum docente encontrado</Typography>
        </Box>
      )}
      {isLoading && (
        <Box
          className="flex items-center justify-center"
          sx={{
            height: '25rem',
            backgroundColor: 'primary',
            borderRadius: '1.5rem',
            borderWidth: '1px',
            borderColor: 'primary',
          }}
        >
          <Typography variant="body2">Carregando...</Typography>
        </Box>
      )}
      {teachers.map((teacher) => (
        <TeachersItem key={teacher.user_id} teacher_id={teacher.user_id} />
      ))}
    </Box>
  );
}
