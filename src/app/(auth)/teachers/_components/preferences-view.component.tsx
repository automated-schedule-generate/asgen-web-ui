'use client';
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useUser } from '@/contexts/user.context';
import { PreferenceDaysTable } from './preference-days-table.component';
import { getTeacherPreferences } from '../(routes)/preferences/_services/preferences.service';
import { useRouter } from 'next/navigation';

export function PreferencesView() {
  const router = useRouter();
  const { user } = useUser();

  const [initialMorning, setInitialMorning] = useState<boolean[] | undefined>();
  const [initialAfternoon, setInitialAfternoon] = useState<
    boolean[] | undefined
  >();

  React.useEffect(() => {
    if (!user?.id) return;

    type PreferencesApiResponse = {
      preferences: { turn: string; preference: boolean[][] }[];
    };

    getTeacherPreferences(user.id)
      .then((data) => {
        const morningValues = new Array(5).fill(false);
        const afternoonValues = new Array(5).fill(false);

        const response = data as unknown as PreferencesApiResponse;
        const list = response?.preferences ?? [];

        for (const item of list) {
          const values =
            item.turn === 'morning' ? morningValues : afternoonValues;
          item.preference?.forEach((daySlots, dayIndex) => {
            if (dayIndex >= 0 && dayIndex < 5) {
              values[dayIndex] = daySlots.some(Boolean);
            }
          });
        }

        setInitialMorning(morningValues);
        setInitialAfternoon(afternoonValues);
      })
      .catch((err) => console.error('[preferences] fetch error:', err));
  }, [user?.id]);

  const specialNeed = user?.teacher?.special_need;
  const description = user?.teacher?.description_special_need;

  return (
    <Box className="flex flex-col gap-6">
      <Box className="flex flex-row gap-6">
        <Typography variant="h6" color="text.secondary">
          Suas preferências
        </Typography>
        <Button
          onClick={() => router.push('/teachers/preferences/edit')}
          startIcon={<Edit />}
          variant="contained"
          color="secondary"
          className="flex self-end"
        >
          Editar
        </Button>
      </Box>
      <Box className="flex flex-col gap-1">
        <Typography variant="body2" color="text.secondary">
          Necessidade especial:
        </Typography>
        <Typography variant="body1">{specialNeed ? 'Sim' : 'Não'}</Typography>
        {specialNeed && description && (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Descrição:
            </Typography>
            <Typography variant="body1">{description}</Typography>
          </>
        )}
      </Box>
      <Box>
        <Typography variant="body1">Dias e turnos de preferência:</Typography>
        <PreferenceDaysTable
          disabled
          initialMorning={initialMorning}
          initialAfternoon={initialAfternoon}
        />
      </Box>
    </Box>
  );
}
