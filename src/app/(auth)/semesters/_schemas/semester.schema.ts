import { z } from 'zod';

export const semesterSchema = z.object({
  year: z
    .number('Esse campo é obrigatório')
    .positive('Esse campo deve ser maior que 0'),
  semester: z.enum(['1', '2'], 'Esse campo é obrigatório'),
});

export type SemesterType = z.infer<typeof semesterSchema>;
