import { z } from 'zod';

export const userSchema = z
  .object({
    name: z.string().min(3, 'O nome deve conter no mínimo 3 caracteres'),
    cpf: z.string().min(11, 'O CPF deve conter no mínimo 11 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'A senha deve conter no mínimo 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type User = z.infer<typeof userSchema>;
