# semesters/

Módulo de gerenciamento de semestres letivos.

## Estrutura

```
semesters/
├── _interfaces/
│   └── semester.interface.ts    # Interface do semestre
├── _schemas/
│   └── semester.schema.ts       # Schema Zod do semestre
└── _services/
    └── semesters.service.ts     # Server Actions CRUD de semestres
```

## Notas

- Módulo sem rotas próprias ainda — os dados de semestre são consumidos por outros módulos (ex: turmas, professores)
- Ao adicionar páginas, criar a pasta `(routes)/` com `page.tsx`
