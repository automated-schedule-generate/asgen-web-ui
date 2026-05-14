import { z } from 'zod';

export const subjectSchema = z.object({
  name: z
    .string()
    .min(3, 'O nome da disciplina deve conter pelo menos 3 caracteres'),
  workload: z
    .number('Este campo é obrigatório')
    .min(1, 'A carga horária deve ser maior que 0'),
  is_optional: z.boolean(),
  course_id: z.string().min(1, 'Você deve selecionar um curso'),
  prerequisite_id: z.string().optional().nullable(),
});

export type SubjectType = z.infer<typeof subjectSchema>;
