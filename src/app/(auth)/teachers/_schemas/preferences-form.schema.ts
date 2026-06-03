import { z } from 'zod';
import { preferencesSchema } from './preferences.schema';
import { teacherSchema } from './teacher.schema';

export const preferencesFormSchema = teacherSchema
  .merge(preferencesSchema)
  .refine(
    (data) =>
      !data.special_need ||
      (!!data.description_special_need &&
        data.description_special_need.length >= 10),
    {
      message:
        'Descrição da necessidade especial deve ter no mínimo 10 caracteres',
      path: ['description_special_need'],
    },
  );

export type PreferencesFormType = z.infer<typeof preferencesFormSchema>;

export const preferencesFormDefaultValues: PreferencesFormType = {
  user_id: '',
  workload: '20',
  special_need: false,
  description_special_need: '',
  observation: '',
};
