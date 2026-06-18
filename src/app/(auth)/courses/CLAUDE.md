# courses/

Módulo de gerenciamento de cursos.

## Rotas

| Arquivo                       | URL                 | Descrição          |
| ----------------------------- | ------------------- | ------------------ |
| `(routes)/page.tsx`           | `/courses`          | Listagem de cursos |
| `(routes)/[id]/edit/page.tsx` | `/courses/:id/edit` | Edição de curso    |

## Estrutura

```
courses/
├── _components/
│   ├── course-form.component.tsx         # Formulário compartilhado (criar/editar)
│   ├── course-item.component.tsx         # Card/item individual de curso
│   └── create-course-modal.component.tsx # Modal de criação de curso
├── _enums/
│   └── course.enum.ts                    # Enumerações do domínio (ex: modalidade)
├── _schemas/
│   └── course.schema.ts                  # Schema Zod do curso
├── _services/
│   └── courses.service.ts                # Server Actions CRUD de cursos
└── _types/
    └── course.types.ts                   # Tipos TypeScript do curso
```

## Notas

- Criação feita via modal (`create-course-modal`) na própria página de listagem, sem rota separada `/create`
- Edição em rota dedicada `[id]/edit`
