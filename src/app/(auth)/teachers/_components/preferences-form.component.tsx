'use client';
import React from 'react';
import { Card, CardContent, Box } from '@mui/material';
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
              <FormInput
                name={'preference'}
                label={'preferncia:'}
                key={'preferencia'}
                placeholder={'testeindo'}
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
