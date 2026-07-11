@AGENTS.md

# ASGEN Web UI

**IMPORTANTE:** No início de cada conversa, execute a skill `prime-context` (via Skill tool) antes de qualquer outra tarefa. Ela carrega todos os `CLAUDE.md` e skills do projeto uma única vez; depois disso, não releia esses arquivos durante a sessão.

Frontend do sistema de geração automática de horários do IFPE (Automated Schedule GENeration).

## Stack

- **Next.js 16.2.1** com App Router e React 19
- **TypeScript** estrito
- **Material UI v7** para componentes de interface
- **Tailwind CSS v4** para utilitários de estilo
- **React Hook Form + Zod v4** para formulários e validação
- **Axios + HTTP/2** para chamadas à API
- **React Toastify** para notificações
- **VLibras** para acessibilidade (Libras)
- **Deno** como runtime de produção (`deno serve`)

## Arquitetura

Arquitetura modular (feature-based). Cada entidade do domínio tem seu próprio módulo dentro de `src/app/(auth)/`. Componentes, serviços, schemas, tipos e rotas ficam isolados dentro do módulo.

```
src/
├── app/               # Rotas e módulos (App Router)
│   ├── (auth)/        # Grupo autenticado — layout com AppBar, Drawer, Breadcrumb
│   │   ├── classes/   # Módulo de turmas
│   │   ├── courses/   # Módulo de cursos
│   │   ├── dashboard/ # Painel principal
│   │   ├── functions/ # Módulo de funções/cargos
│   │   ├── semesters/ # Módulo de semestres
│   │   ├── subjects/  # Módulo de disciplinas
│   │   ├── teachers/  # Módulo de professores (inclui preferências)
│   │   └── users/     # Módulo de usuários
│   └── (home)/        # Landing page pública
├── assets/            # Arquivos estáticos (imagens, fontes, SVGs)
├── components/        # Componentes reutilizáveis e genéricos
├── contexts/          # React Contexts globais
├── hooks/             # Custom hooks globais
├── interfaces/        # Interfaces TypeScript globais
├── lib/               # Configurações de bibliotecas (ex: tema MUI)
├── plugin/            # Utilitários server-side (API, cookies, env)
└── utils/             # Funções utilitárias puras
```

## Convenções de nomenclatura

| Tipo             | Sufixo           | Exemplo                   |
| ---------------- | ---------------- | ------------------------- |
| Componente React | `.component.tsx` | `user-form.component.tsx` |
| Serviço (API)    | `.service.ts`    | `user.service.ts`         |
| Custom hook      | `.hook.ts`       | `use-user.hook.ts`        |
| Schema Zod       | `.schema.ts`     | `user.schema.ts`          |
| Interface TS     | `.interface.ts`  | `user.interface.ts`       |
| Utilitário       | `.util.ts`       | `format-user.util.ts`     |
| Plugin           | `.plugin.ts`     | `api.plugin.ts`           |
| Tipo TS          | `.type.ts`       | `user.type.ts`            |

Nomes de arquivo em `kebab-case`. Exportações nomeadas (não default) preferidas em serviços e hooks.

## Diretivas React / Next.js

- Funções de servidor (Server Actions) usam `'use server'` no topo
- Componentes interativos usam `'use client'` no topo
- Sem diretiva = Server Component por padrão
- Todos os arquivos em `src/plugin/` são exclusivamente server-side

## Formulários

Sempre usar `useFormWithZod` de `src/hooks/use-form-with-zod.hook.ts` em vez de `useForm` diretamente. O hook integra React Hook Form com Zod v4 e gera valores padrão automaticamente a partir do schema.

## Chamadas de API

Sempre importar `getApi` de `@/plugin/api.plugin` dentro de funções `'use server'`. Nunca instanciar axios diretamente nos módulos — o plugin já configura autenticação por token e o adaptador HTTP/2.

## Endpoints da API (Swagger)

Para descobrir os endpoints disponíveis na API, use a documentação OpenAPI exposta pelo Swagger do backend:

1. Leia o valor de `API_URL` no `.env` (ex: `http://localhost:9000/dev/api`)
2. Remova o path e mantenha apenas a base URL (ex: `http://localhost:9000`)
3. Acesse `<base-url>/docs/json` (preferido — OpenAPI 3.0 em JSON, fácil de filtrar com `jq`) ou `<base-url>/docs/yaml`

Exemplo: `API_URL=http://localhost:9000/dev/api` → `http://localhost:9000/docs/json`

Os paths retornados no spec já incluem o prefixo de ambiente do `API_URL` (ex: `/dev/api/user/register`). Para listar rapidamente todos os endpoints:

```bash
curl -s <base-url>/docs/json | jq '.paths | keys'
```

## Autenticação

Baseada em cookie `token` (JWT). O middleware em `src/proxy.ts` protege as rotas e redireciona conforme presença do cookie.

## Estilo

- MUI para layout, inputs, tabelas e feedback (Snackbar, Dialog)
- Tailwind para espaçamentos pontuais e classes utilitárias
- Tema customizado em `src/lib/theme.ts` — não sobrescrever cores diretamente nos componentes, usar as variáveis do tema
- Paleta principal: `primary` = preto, `secondary` = azul escuro `#03017d`

## Comandos

```bash
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção
npm run lint     # ESLint
npm run format   # Prettier
```
