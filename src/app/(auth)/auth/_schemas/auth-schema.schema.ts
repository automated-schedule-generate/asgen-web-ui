import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().email({ message: 'Endereço de email inválido' }),
  password: z.string(),
});

export type AuthType = z.infer<typeof authSchema>;
