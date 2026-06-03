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
import { Cancel, Send, Edit } from '@mui/icons-material';
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
import { createTeacherPreferences } from '../(routes)/preferences/_services/preferences.service';

export function PreferencesForm() {
  const {
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { isValid },
  } = useFormWithZod(preferencesFormSchema, {
    mode: 'onChange',
    defaultValues: preferencesFormDefaultValues,
  });
  const hasSpecialNeed = useWatch({
    name: 'special_need',
    control,
  });
  const { user } = useUser();
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    if (user?.teacher) {
      reset({
        ...preferencesFormDefaultValues,
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
    try {
      console.log('cheguei aqui', 'eu sou:', preferencesPayload);
      await updateTeacher(data);
      await createTeacherPreferences(preferencesPayload);
      console.log('enviei');
      setIsEditing(false);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6">
        <Button
          startIcon={<Edit />}
          onClick={() => setIsEditing(true)}
          disabled={isEditing}
          variant="outlined"
          color="secondary"
        >
          Editar preferências
        </Button>
        <Box>
          <Typography variant="body1">
            Marque na tabela abaixo seus dias e turnos de preferência:
          </Typography>
          <PreferenceDaysTable
            disabled={!isEditing}
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
                  onChange={(event) =>
                    field.onChange(event.target.value === 'true')
                  }
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio disabled={!isEditing} />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio disabled={!isEditing} />}
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
              label={'Descrição da necessidade especial*:'}
              id={'description_special_need'}
              placeholder={'Escreva sobre sua necessidade especial'}
              type={'textarea'}
              defaultValue={user?.teacher?.description_special_need || ''}
              control={control}
              minRows={3}
              maxRows={3}
              disabled={!isEditing}
            />
            <FormInput
              name={'observation'}
              label={'Observação:'}
              id={'observation'}
              placeholder={'Escreva uma observação'}
              type={'textarea'}
              defaultValue={user?.teacher?.observation || ''}
              control={control}
              minRows={3}
              maxRows={3}
              disabled={!isEditing}
              onFocus={() => trigger('description_special_need')}
            />
          </Box>
        )}
        {isEditing && (
          <Box className="flex justify-end gap-2">
            <Button
              variant="outlined"
              type="button"
              color="error"
              onClick={() => setIsEditing(false)}
              startIcon={<Cancel />}
            >
              Cancelar
            </Button>
            <Button
              disabled={!isValid && hasSpecialNeed}
              variant="contained"
              type="submit"
              className="self-end"
              color="secondary"
              endIcon={<Send />}
            >
              Enviar
            </Button>
          </Box>
        )}
      </form>
    </>
  );
}
