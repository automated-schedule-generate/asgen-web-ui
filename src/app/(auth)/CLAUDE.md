# (auth)/

Grupo de rotas autenticadas. Toda rota dentro deste grupo exige o cookie `token`.

## Layout

O `layout.tsx` deste grupo:

1. Executa `me()` no servidor para buscar dados do usuário autenticado
2. Inicializa `UserProvider` com `currentUser`
3. Renderiza `DefaultAppBar`, `DrawerMenu` e `AutoBreadcrumbs`

Se o backend estiver offline, `user` fica `null` e o layout continua funcionando (erro capturado com `try/catch`).

## Módulos

| Módulo       | URL base     | Descrição                             |
| ------------ | ------------ | ------------------------------------- |
| `auth/`      | `/auth`      | Autenticação (login)                  |
| `classes/`   | `/classes`   | Turmas                                |
| `courses/`   | `/courses`   | Cursos                                |
| `dashboard/` | `/dashboard` | Painel principal                      |
| `functions/` | `/functions` | Funções/cargos                        |
| `semesters/` | `/semesters` | Semestres                             |
| `subjects/`  | `/subjects`  | Disciplinas                           |
| `teachers/`  | `/teachers`  | Professores e preferências de horário |
| `users/`     | `/users`     | Usuários do sistema                   |

## Componentes compartilhados do grupo

Ficam em `_components/` e são usados apenas dentro do layout deste grupo:

| Componente                   | Descrição                                    |
| ---------------------------- | -------------------------------------------- |
| `app-bar.component.tsx`      | Barra superior com título e ações do usuário |
| `breadcrumb.component.tsx`   | Breadcrumb automático baseado no pathname    |
| `drawer-menu.component.tsx`  | Menu lateral de navegação                    |
| `menu-item.component.tsx`    | Item individual do menu lateral              |
| `user-options.component.tsx` | Menu dropdown de opções do usuário logado    |
