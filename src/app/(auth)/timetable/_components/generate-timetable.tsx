'use client';

import { Button, Typography, Box } from '@mui/material';
import {
  findTimetableProgress,
  generateTimetableAllCourses,
} from '../../courses/_services/courses.service';
import React from 'react';
import { toast, type Id } from 'react-toastify';
import { TimetableProgressEnum } from '../enums/timetable-progress.enum';

type Message = {
  status: 'success' | 'error';
  value: string;
};

export function GenerateTimetable() {
  const [message, setMessage] = React.useState<Message>();
  const [requesting, setRequesting] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState<TimetableProgressEnum>(
    TimetableProgressEnum.NOT_STARTED,
  );
  const toastIdRef = React.useRef<Id | null>(null);

  const loading = requesting || isGenerating === TimetableProgressEnum.STARTED;

  const fetchTimetableProgress = React.useCallback(() => {
    findTimetableProgress().then((response) => {
      if (response.success && response.data?.status) {
        setIsGenerating(response.data.status);
      }
    });
  }, []);

  React.useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);

  React.useEffect(() => {
    fetchTimetableProgress();
  }, [fetchTimetableProgress]);

  React.useEffect(() => {
    if (isGenerating === TimetableProgressEnum.STARTED) {
      const render = 'A grade de horários ainda está sendo gerada...';
      if (toastIdRef.current === null) {
        toastIdRef.current = toast.loading(render);
      } else {
        toast.update(toastIdRef.current, { render, isLoading: true });
      }

      const interval = setInterval(fetchTimetableProgress, 5000);
      return () => {
        clearInterval(interval);
      };
    }

    if (
      isGenerating === TimetableProgressEnum.COMPLETED &&
      toastIdRef.current !== null
    ) {
      toast.update(toastIdRef.current, {
        render: 'A grade de horários foi gerada com sucesso!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
      toastIdRef.current = null;
    }
  }, [isGenerating, fetchTimetableProgress]);

  const generateTimetable = React.useCallback(async () => {
    setRequesting(true);
    const toastId = (toastIdRef.current ??= toast.loading(
      'Gerando nova grade de horários...',
    ));
    try {
      const data = await generateTimetableAllCourses();
      setMessage({ status: 'success', value: data.message });
      setIsGenerating(TimetableProgressEnum.STARTED);
    } catch (error) {
      const errorMessage = 'Ocorreu um erro ao gerar a nova grade';
      setMessage({ status: 'error', value: errorMessage });
      toast.update(toastId, {
        render: errorMessage,
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
      toastIdRef.current = null;
      console.log(error);
    } finally {
      setRequesting(false);
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
