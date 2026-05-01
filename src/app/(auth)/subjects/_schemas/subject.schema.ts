import { z } from 'zod';

export const subjectSchema = z.object({
  name: z
    .string()
    .min(3, 'O nome da disciplina deve conter pelo menos 3 caracteres'),
  workload: z.number().min(1, 'A carga horária deve ser maior que 0'),
  is_optional: z.boolean().default(false),
  course_id: z.string().max(1, 'Você deve selecionar um curso'),
  prerequisite_id: z.string().optional(),
});

export type SubjectSchema = z.infer<typeof subjectSchema>;
