import { z } from 'zod';

export const courseSchema = z.object({
  id: z.string().nullable(),
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  class_time: z.enum(['45', '60'], 'O tempo de aula é obrigatório'),
  total_semesters: z
    .number()
    .min(1, 'O número de semestres deve ser maior que 0'),
});

export type CourseType = z.infer<typeof courseSchema>;
