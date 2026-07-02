'use client';
import React, { useState } from 'react';
import {
  Box,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Button,
} from '@mui/material';
import { Cancel, Save } from '@mui/icons-material';
import { FormInput } from '@/components/utilities/form-input.component';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';
import { PreferenceDaysTable } from './preference-days-table.component';
import { Controller, useWatch } from 'react-hook-form';
import {
  preferencesFormSchema,
  preferencesFormDefaultValues,
  PreferencesFormType,
} from '../_schemas/preferences-form.schema';
import { updateTeacher } from '../_services/teacher.service';
import { useUser } from '@/contexts/user.context';
import {
  createTeacherPreferences,
  getTeacherPreferences,
} from '../(routes)/preferences/_services/preferences.service';
import { ConfirmDialogBlue } from '@/components/utilities/confirm-dialog-blue.component';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export function PreferencesForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid },
  } = useFormWithZod(preferencesFormSchema, {
    mode: 'onChange',
    defaultValues: preferencesFormDefaultValues,
  });
  const hasSpecialNeed = useWatch({
    name: 'special_need',
    control,
  });
  const { user, setUser } = useUser();

  React.useEffect(() => {
    if (user?.teacher) {
      reset({
        user_id: user.id ?? '',
        workload: (user.teacher.workload as '20' | '40') ?? '20',
        special_need: user.teacher.special_need ?? false,
        description_special_need: user.teacher.description_special_need ?? '',
        observation: user.teacher.observation ?? '',
      });
    }
  }, [user, reset]);

  const [preferenceMorning, setPreferenceMorning] = useState<boolean[]>(
    new Array(5).fill(false),
  );
  const [preferenceAfternoon, setPreferenceAfternoon] = useState<boolean[]>(
    new Array(5).fill(false),
  );
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
        setPreferenceMorning(morningValues);
        setInitialAfternoon(afternoonValues);
        setPreferenceAfternoon(afternoonValues);
      })
      .catch((err) => console.error('[preferences] fetch error:', err));
  }, [user?.id]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  async function submit(data: PreferencesFormType) {
    const preferencesPayload = {
      preferences: [
        {
          turn: 'morning',
          preference: preferenceMorning.map((value) => Array(6).fill(value)),
        },
        {
          turn: 'afternoon',
          preference: preferenceAfternoon.map((value) => Array(6).fill(value)),
        },
      ],
    };
    const toastId = toast.loading('Atualizando preferências...');
    try {
      await updateTeacher(data);
      await createTeacherPreferences(preferencesPayload);
      setUser({
        ...user,
        teacher: {
          ...user?.teacher,
          special_need: data.special_need,
          description_special_need: data.description_special_need ?? '',
          observation: data.observation ?? '',
        },
      });
      toast.update(toastId, {
        render: 'Preferências atualizadas com sucesso!',
        type: 'success',
        isLoading: false,
        autoClose: 1500,
      });
      router.push('/teachers/preferences');
    } catch {
      toast.update(toastId, {
        render: 'Erro ao atualizar preferências.',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6">
        <Box>
          <Typography variant="body1">
            Marque na tabela abaixo seus dias e turnos de preferência:
          </Typography>
          <PreferenceDaysTable
            initialMorning={initialMorning}
            initialAfternoon={initialAfternoon}
            onChangeMorning={(preferenceMorning) =>
              setPreferenceMorning(preferenceMorning)
            }
            onChangeAfternoon={(preferenceAfternoon) =>
              setPreferenceAfternoon(preferenceAfternoon)
            }
          />
        </Box>
        <Box>
          <Controller
            name="special_need"
            control={control}
            render={({ field }) => (
              <>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Você possui alguma necessidade especial?
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={field.value}
                  onChange={(event) => {
                    const val = event.target.value === 'true';
                    field.onChange(val);
                    if (!val) setValue('description_special_need', '');
                  }}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Não"
                  />
                </RadioGroup>
              </>
            )}
          />
        </Box>
        {hasSpecialNeed && (
          <Box className="flex flex-col gap-2">
            <FormInput
              name={'description_special_need'}
              label={'Descrição da necessidade especial:'}
              id={'description_special_need'}
              placeholder={'Escreva sobre sua necessidade especial'}
              type={'textarea'}
              defaultValue={user?.teacher?.description_special_need || ''}
              control={control}
              minRows={3}
              maxRows={3}
              required
            />
          </Box>
        )}

        <Box className="flex justify-end gap-2">
          <Button
            variant="contained"
            type="button"
            color="error"
            onClick={() => {
              reset({
                ...preferencesFormDefaultValues,
                special_need: user?.teacher?.special_need ?? false,
                description_special_need:
                  user?.teacher?.description_special_need ?? '',
                observation: user?.teacher?.observation ?? '',
              });
            }}
            startIcon={<Cancel />}
          >
            Cancelar
          </Button>
          <Button
            disabled={!isValid && hasSpecialNeed}
            variant="contained"
            type="button"
            onClick={() => setConfirmDialogOpen(true)}
            className="self-end"
            color="secondary"
            endIcon={<Save />}
          >
            Salvar
          </Button>
        </Box>
        <ConfirmDialogBlue
          open={confirmDialogOpen}
          title="Atenção"
          content={`As preferências selecionadas não afetarão a grade de horário atual. Deseja continuar?`}
          onConfirm={() => {
            setConfirmDialogOpen(false);
            handleSubmit(submit)();
          }}
          onCancel={() => {
            setConfirmDialogOpen(false);
          }}
        />
      </form>
    </>
  );
}
