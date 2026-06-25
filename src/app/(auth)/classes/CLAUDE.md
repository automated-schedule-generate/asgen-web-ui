# classes/

Módulo de gerenciamento de turmas.

## Rotas

| Arquivo                       | URL                 | Descrição          |
| ----------------------------- | ------------------- | ------------------ |
| `(routes)/page.tsx`           | `/classes`          | Listagem de turmas |
| `(routes)/create/page.tsx`    | `/classes/create`   | Criação de turma   |
| `(routes)/[id]/edit/page.tsx` | `/classes/:id/edit` | Edição de turma    |

## Estrutura

```
classes/
├── _components/
│   ├── classes-create-form.tsx          # Formulário de criação
│   ├── classes-edit-form.component.tsx  # Formulário de edição
│   ├── classes-items.component.tsx      # Item individual na lista
│   └── classes-list.component.tsx       # Lista de turmas
├── _interfaces/
│   └── class.interface.ts               # Interface da turma
├── _schemas/
│   └── class.schema.ts                  # Schema Zod da turma
└── _services/
    └── classes.service.ts               # Server Actions CRUD de turmas
```

## classes.service.ts

CRUD completo via API `/class`:

- `getAllClasses({ page, limit, search })` — paginado com busca
- `createClass(payload)` — criação
- `updateClass(id, payload)` — atualização
- `getClassById(id)` — busca por ID (carrega todos e filtra localmente)
- `deleteClass(id)` — remoção
