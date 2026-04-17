import { z } from 'zod';

export const userSchema = z
  .object({
    name: z.string().min(3, 'O nome deve conter no mínimo 3 caracteres'),
    surname: z
      .string()
      .min(3, 'O sobrenome deve conter no mínimo 3 caracteres'),
    cpf: z.string().refine((val) => val.replace(/\D/g, '').length === 11, {
      message: 'CPF inválido',
    }),
    email: z.string().email('Email inválido'),
    password: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .max(100, 'Senha muito longa')
      .regex(/[A-Z]/, 'Deve conter ao menos uma letra maiúscula')
      .regex(/[a-z]/, 'Deve conter ao menos uma letra minúscula')
      .regex(/[0-9]/, 'Deve conter ao menos um número')
      .regex(/[^a-zA-Z0-9]/, 'Deve conter ao menos um caractere especial'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type UserType = z.infer<typeof userSchema>;
