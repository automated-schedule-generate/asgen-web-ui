import { z } from 'zod';
import { UserType } from '../../users/_schemas/user.schema';

export const teacherSchema = z.object({
  user_id: z.string(),
  workload: z.enum(['20', '40'], 'Carga horária deve ser 20 ou 40 horas'),
});

export type TeacherType = z.infer<typeof teacherSchema> & {
  user: UserType;
};
