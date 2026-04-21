import { z } from 'zod';

export const teacherSchema = z.object({
  user_id: z.string(),
  workload: z.enum(['20', '40'], 'Carga horária deve ser 20 ou 40 horas'),
});

export type TeacherType = z.infer<typeof teacherSchema>;
