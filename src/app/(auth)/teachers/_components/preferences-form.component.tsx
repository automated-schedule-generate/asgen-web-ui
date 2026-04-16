'use client';
import React from 'react';
import {
  Card,
  CardContent,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { FormInput } from '@/components/utilities/form-input.component';
import { teacherSchema } from '../_schemas/teacher.schema';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';

export function PreferencesForm() {
  const { control } = useFormWithZod(teacherSchema);
  return (
    <>
      <Card>
        <CardContent>
          <h1>Preferências</h1>
          <form>
            <Box>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Você possui alguma necessidade especial?
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
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
              </FormControl>
            </Box>
            <Box>
              <FormInput
                name={'description'}
                label={'Descrição*:'}
                id={'description'}
                placeholder={'Escreva uma descrição'}
                type={'textarea'}
                control={control}
                minRows={3}
                maxRows={3}
              />
              <FormInput
                name={'observation'}
                label={'Observação:'}
                id={'observation'}
                placeholder={'Escreva uma observação'}
                type={'textarea'}
                control={control}
                minRows={3}
                maxRows={3}
              />
            </Box>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
