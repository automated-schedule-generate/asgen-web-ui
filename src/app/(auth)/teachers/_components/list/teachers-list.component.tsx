'use client';
import { Box, CircularProgress, Typography } from '@mui/material';
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
            Nenhum docente encontrado no sistema.
          </Typography>
        </Box>
      )}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={40} sx={{ color: '#0B0A7A' }} />
        </Box>
      )}
      {teachers.map((teacher) => (
        <TeachersItem key={teacher.user_id} teacher_id={teacher.user_id} />
      ))}
    </Box>
  );
}
