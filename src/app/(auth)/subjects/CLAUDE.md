# subjects/

Módulo de gerenciamento de disciplinas.

## Rotas

| Arquivo                       | URL                  | Descrição               |
| ----------------------------- | -------------------- | ----------------------- |
| `(routes)/page.tsx`           | `/subjects`          | Listagem de disciplinas |
| `(routes)/create/page.tsx`    | `/subjects/create`   | Criação de disciplina   |
| `(routes)/[id]/edit/page.tsx` | `/subjects/:id/edit` | Edição de disciplina    |

## Estrutura

```
subjects/
├── _components/
│   ├── subjects-create-form.component.tsx  # Formulário de criação
│   ├── subjects-edit-form.component.tsx    # Formulário de edição
│   ├── subjects-items.component.tsx        # Item individual na lista
│   └── subjects-list.component.tsx         # Lista de disciplinas
├── _interfaces/
│   └── subject.interface.ts                # Interface da disciplina
├── _schemas/
│   └── subject.schema.ts                   # Schema Zod da disciplina
└── _services/
    └── subjects.service.ts                 # Server Actions CRUD de disciplinas
```
