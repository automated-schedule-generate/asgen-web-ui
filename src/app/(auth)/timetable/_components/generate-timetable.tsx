'use client';

import { Button, Typography, Box } from '@mui/material';
import { generateTimetableAllCourses } from '../../courses/_services/courses.service';
import React from 'react';
import { toast } from 'react-toastify';

type Message = {
  status: 'success' | 'error';
  value: string;
};

export function GenerateTimetable() {
  const [message, setMessage] = React.useState<Message>();
  const [loading, setLoading] = React.useState(false);

  const generateTimetable = React.useCallback(async () => {
    setLoading(true);
    const toastId = toast.loading('Gerando nova grade de horários...');
    try {
      const data = await generateTimetableAllCourses();
      setMessage({ status: 'success', value: data.message });
      toast.update(toastId, {
        render: data.message,
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      const errorMessage = 'Ocorreu um erro ao gerar a nova grade';
      setMessage({ status: 'error', value: errorMessage });
      toast.update(toastId, {
        render: errorMessage,
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Box sx={{ mb: 3 }}>
      <Button
        variant="contained"
        disabled={loading}
        sx={{
          bgcolor: '#03017D',
          '&:hover': { bgcolor: '#03017D', opacity: 0.85 },
        }}
        onClick={generateTimetable}
      >
        {loading ? 'Gerando...' : 'Gerar nova grade de horários'}
      </Button>
      <Typography
        variant="caption"
        sx={{ display: 'block', mt: 1, color: 'text.secondary' }}
      >
        Obs.: A nova grade só substituirá a atual se obtiver uma avaliação
        melhor. E qualquer alteração será perdida!
      </Typography>
      {message && (
        <Typography
          variant="body2"
          sx={{
            display: 'block',
            mt: 1,
            fontWeight: 600,
            color: message.status === 'success' ? 'success.main' : 'error.main',
          }}
        >
          {message.value}
        </Typography>
      )}
    </Box>
  );
}
