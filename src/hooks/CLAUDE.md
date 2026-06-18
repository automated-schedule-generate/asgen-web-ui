# hooks/

Custom hooks React globais — reutilizáveis em qualquer módulo.

## Regras

- Sufixo obrigatório: `.hook.ts` (ou `.hook.tsx` se retornar JSX)
- Nome do hook em `camelCase` iniciando com `use`
- Hooks globais aqui; hooks específicos de módulo ficam em `src/app/(auth)/<módulo>/_hooks/`
- Sempre `'use client'` — hooks React não rodam no servidor

## Arquivos atuais

| Arquivo                     | Hook             | Descrição                                                                    |
| --------------------------- | ---------------- | ---------------------------------------------------------------------------- |
| `use-form-with-zod.hook.ts` | `useFormWithZod` | Integração React Hook Form + Zod v4 com geração automática de valores padrão |

## useFormWithZod

Wrapper sobre `useForm` do React Hook Form que configura `zodResolver` e gera `defaultValues` automaticamente a partir do schema Zod.

```ts
const form = useFormWithZod(MySchema, { defaultValues: { name: 'João' } });
```

**Sempre usar este hook** em vez de `useForm` diretamente para garantir consistência na validação e nos valores iniciais. Suporta Zod v4 (`z.ZodObject`).
