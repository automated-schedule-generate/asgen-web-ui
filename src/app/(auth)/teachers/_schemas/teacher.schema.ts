import { z } from 'zod';

export const teacherSchema = z.object({
  workload: z.enum(['20', '40'], 'Carga horária deve ser 20 ou 40 horas'),
  userId: z.string(),
});

export type TeacherType = z.infer<typeof teacherSchema>;
