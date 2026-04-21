'use client';
import { Box, Typography } from '@mui/material';

export function TeacherDetailsComponent() {
  return (
    <Box>
      <Typography variant="body1">Nome: </Typography>
      <Typography variant="body1">Carga horária: </Typography>
      <Box>
        <Typography variant="body1">Disciplinas: </Typography>
      </Box>
    </Box>
  );
}
