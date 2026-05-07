import { z } from 'zod';
import { preferencesSchema } from './preferences.schema';
import { teacherSchema } from './teacher.schema';

export const preferencesFormSchema = teacherSchema.merge(preferencesSchema);

export type PreferencesFormType = z.infer<typeof preferencesFormSchema>;

export const preferencesFormDefaultValues: PreferencesFormType = {
  user_id: '',
  workload: '20',
  special_need: false,
  description_special_need: '',
  observation: '',
};
