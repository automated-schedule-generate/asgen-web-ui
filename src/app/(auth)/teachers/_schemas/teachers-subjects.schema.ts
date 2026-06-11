import { z } from 'zod';

export const teacherSubjectsSchema = z.object({
  subject_id: z.string().min(1, 'Selecione uma disciplina'),
  semester_id: z.string().min(1, 'Selecione um semestre'),
});

export type TeacherSubjectsType = z.infer<typeof teacherSubjectsSchema>;
