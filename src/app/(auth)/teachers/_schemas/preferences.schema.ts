import { z } from 'zod';

export const preferencesSchema = z.object({
  special_need: z.boolean(),
  description_special_need: z.string(),
  observation: z.string().optional(),
});

export type PreferencesType = z.infer<typeof preferencesSchema>;
