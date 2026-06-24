# users/

Módulo de gerenciamento de usuários do sistema.

## Estrutura

```
users/
├── _components/
│   └── register-form.component.tsx  # Formulário de cadastro de usuário
├── _schemas/
│   └── user.schema.ts               # Schema Zod do usuário
└── _services/
    └── user.service.ts              # Server Actions CRUD de usuários
```

## Notas

- Módulo sem rotas próprias ainda — o formulário de cadastro é usado embutido em outra página ou modal
- O schema de usuário é distinto da interface global `IUser` em `src/interfaces/` — o schema Zod é usado para validação de formulários, a interface para tipagem de resposta da API
- Ao adicionar páginas, criar `(routes)/` com `page.tsx`
