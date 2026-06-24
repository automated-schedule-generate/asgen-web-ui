# (home)/

Landing page pública do ASGEN. Não exige autenticação.

## Páginas

| Arquivo    | URL | Descrição              |
| ---------- | --- | ---------------------- |
| `page.tsx` | `/` | Página inicial pública |

## Componentes

Ficam em `_components/` e constroem as seções da landing page:

| Componente                     | Seção                                                       |
| ------------------------------ | ----------------------------------------------------------- |
| `app-bar.component.tsx`        | Barra de navegação pública (diferente da barra autenticada) |
| `hero.component.tsx`           | Seção hero — chamada principal                              |
| `about.component.tsx`          | Seção "Sobre o projeto"                                     |
| `features.component.tsx`       | Seção de funcionalidades                                    |
| `how-it-works.component.tsx`   | Seção "Como funciona"                                       |
| `use-cases.component.tsx`      | Seção de casos de uso                                       |
| `project-status.component.tsx` | Status atual do projeto                                     |
| `footer.component.tsx`         | Rodapé                                                      |

## Notas

- Quando o usuário acessa `/` com o cookie `token` presente, o middleware redireciona para `/dashboard`
- O layout deste grupo (`layout.tsx`) é separado do layout autenticado — sem AppBar com Drawer
