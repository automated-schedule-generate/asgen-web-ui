import { z } from 'zod';

export const roleSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  description: z
    .string()
    .min(5, 'A descrição deve ter pelo menos 5 caracteres')
    .optional(),
});

export type RoleType = z.infer<typeof roleSchema> & {
  id: string;
  created_at?: string;
  updated_at?: string;
};
