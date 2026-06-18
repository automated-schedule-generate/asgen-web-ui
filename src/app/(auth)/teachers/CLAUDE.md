# teachers/

Módulo de professores — o módulo mais complexo do sistema. Gerencia o cadastro de professores, atribuição de disciplinas e preferências de horário.

## Rotas

| Arquivo                                       | URL                          | Descrição                    |
| --------------------------------------------- | ---------------------------- | ---------------------------- |
| `(routes)/page.tsx`                           | `/teachers`                  | Listagem de professores      |
| `(routes)/[id]/edit/page.tsx`                 | `/teachers/:id/edit`         | Edição de professor          |
| `(routes)/preferences/(routes)/page.tsx`      | `/teachers/preferences`      | Visualização de preferências |
| `(routes)/preferences/(routes)/edit/page.tsx` | `/teachers/preferences/edit` | Edição de preferências       |

## Estrutura

```
teachers/
├── _components/
│   ├── list/
│   │   ├── teachers-list.component.tsx           # Lista de professores
│   │   ├── teachers-list-item.component.tsx      # Item da lista (linha)
│   │   └── teachers-item.component.tsx           # Card de professor
│   ├── table/
│   │   └── table-cell.component.tsx              # Célula customizada da tabela
│   ├── teacher/
│   │   ├── teacher-details.component.tsx         # Detalhes do professor
│   │   └── add-teacher-subjects.component.tsx    # Atribuição de disciplinas
│   ├── preference-days-table.component.tsx       # Tabela de dias/turnos de preferência
│   ├── preferences-form.component.tsx            # Formulário de preferências de horário
│   └── preferences-view.component.tsx            # Visualização das preferências
├── _schemas/
│   ├── teacher.schema.ts                         # Schema Zod do professor
│   ├── preferences.schema.ts                     # Schema das preferências
│   ├── preferences-form.schema.ts                # Schema do formulário de preferências
│   └── teachers-subjects.schema.ts               # Schema de atribuição de disciplinas
├── _services/
│   └── teacher.service.ts                        # Server Actions CRUD de professores
├── _types/
│   └── teacher-list.type.ts                      # Tipo para a listagem de professores
└── (routes)/preferences/
    └── _services/
        └── preferences.service.ts                # Server Actions específicas de preferências
```

## teacher.service.ts

CRUD completo via API `/teacher`:

- `getTeachers()` — lista todos
- `getTeacherById(id)` — busca por ID
- `createTeacher(payload)` — criação
- `updateTeacher(payload)` — atualização (inclui preferências)
- `deleteTeacher(id)` — remoção

## Preferências de horário

As preferências representam os dias e turnos em que o professor pode/prefere dar aula. A estrutura aninhada é:

```
preference → { day, turn, teacherId }
  └── preferenceTimes → [{ selected_time }]
```

O formulário de preferências (`preferences-form.component.tsx`) usa `useFormWithZod` com `preferences-form.schema.ts`.
