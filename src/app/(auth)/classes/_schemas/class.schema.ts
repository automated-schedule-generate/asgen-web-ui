import { z } from 'zod';

export const classSchema = z.object({
  shift: z.enum(['Matutino', 'Vespertino'], 'Esse campo é obrigatório'),
  course_semester: z
    .number('Esse campo é obrigatório')
    .positive('Esse campo deve ser maior que 0'),
  course_id: z.string('Esse campo é obrigatório'),
  semester_id: z.string('Esse campo é obrigatório'),
});

export type ClassType = z.infer<typeof classSchema>;
