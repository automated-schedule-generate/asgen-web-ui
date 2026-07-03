import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().email({ error: 'Endereço de email inválido' }),
  password: z.string().min(1, { error: 'Campo obrigatório' }),
});

export type AuthType = z.infer<typeof authSchema>;
