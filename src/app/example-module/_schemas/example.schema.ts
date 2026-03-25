import { z } from 'zod';

export const exampleSchema = z.object({
  name: z.string().min(3, 'Mínimo de 3 caracteres'),
  description: z.string().optional(),
});

export type ExampleTypeSchema = z.infer<typeof exampleSchema>;
