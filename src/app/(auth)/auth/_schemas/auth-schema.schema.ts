import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().email({ message: 'Endereço de email inválido' }),
  password: z.string(),
});

export type AuthSchema = z.infer<typeof authSchema>;
