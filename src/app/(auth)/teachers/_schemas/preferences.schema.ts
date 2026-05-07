import { z } from 'zod';

export const preferencesSchema = z.object({
  special_need: z.boolean(),
  description_special_need: z.string().min(10, {
    message: 'Descrição da necessidade especial é obrigatória',
  }),
  observation: z.string().optional(),
});

export type PreferencesType = z.infer<typeof preferencesSchema>;
