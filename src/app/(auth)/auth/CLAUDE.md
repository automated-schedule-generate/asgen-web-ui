# auth/

Módulo de autenticação. Gerencia login e sessão do usuário.

## Rotas

| Arquivo             | URL     | Descrição       |
| ------------------- | ------- | --------------- |
| `(routes)/page.tsx` | `/auth` | Página de login |

## Estrutura

```
auth/
├── _components/
│   └── auth-form.component.tsx   # Formulário de login
├── _schemas/
│   └── auth-schema.schema.ts     # Schema Zod para validação do login
└── _services/
    └── auth.service.ts           # Server Actions: login, logout, me()
```

## auth.service.ts

Exporta Server Actions para:

- `me()` — busca os dados do usuário autenticado (usado no layout de `(auth)`)
- Funções de login e logout

`me()` é chamado no layout pai `(auth)/layout.tsx` para inicializar o `UserProvider`.
