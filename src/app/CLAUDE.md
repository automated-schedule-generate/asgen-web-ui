# app/

Camada de roteamento do Next.js App Router. Contém todos os módulos do sistema organizados por grupos de rota.

## Grupos de rota

| Grupo    | Path                            | Descrição                               |
| -------- | ------------------------------- | --------------------------------------- |
| `(auth)` | `/dashboard`, `/teachers`, etc. | Área autenticada — exige cookie `token` |
| `(home)` | `/`                             | Landing page pública                    |

O middleware em `src/proxy.ts` aplica a guarda de autenticação e redireciona `/` → `/dashboard` quando autenticado, e qualquer rota protegida → `/` quando não autenticado.

## Estrutura de um módulo

```
<modulo>/
├── _components/     # Componentes React do módulo
├── _services/       # Server Actions (use server) — chamadas à API
├── _schemas/        # Schemas Zod para validação
├── _interfaces/     # Interfaces TypeScript do domínio
├── _types/          # Types TypeScript do domínio
├── _hooks/          # Custom hooks do módulo
├── _utils/          # Funções utilitárias do módulo
└── (routes)/        # Páginas Next.js (page.tsx)
    ├── page.tsx     # Listagem / página principal
    ├── create/      # Criação
    └── [id]/edit/   # Edição por ID dinâmico
```

## Arquivos globais do app

| Arquivo       | Descrição                                                        |
| ------------- | ---------------------------------------------------------------- |
| `layout.tsx`  | Root layout — fontes Geist, MuiProvider, ToastContainer, VLibras |
| `globals.css` | CSS global e variáveis Tailwind                                  |
| `favicon.ico` | Ícone da aplicação                                               |

## Convenções

- Páginas (`page.tsx`) são Server Components por padrão; adicionam `'use client'` apenas se necessário
- Server Actions ficam em `_services/` com `'use server'` no topo do arquivo
- Pastas com `_` (underscore) não geram rotas no Next.js App Router
- Pastas com `(nome)` são grupos de rota — não aparecem na URL
