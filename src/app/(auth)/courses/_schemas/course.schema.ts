import { z } from 'zod';

export const courseSchema = z.object({
  id: z.string().nullable(),
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),

  class_time: z.enum(['45', '60'], {
    message: 'O tempo de aula é obrigatório',
  }),

  total_semesters: z.coerce.number().min(1, 'Mínimo de 1 semestre'),
});

export type CourseType = z.infer<typeof courseSchema>;
