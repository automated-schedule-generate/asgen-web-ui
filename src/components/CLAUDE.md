# components/

Componentes React **genéricos e reutilizáveis** — sem vínculo com nenhum módulo específico.

## Regra principal

Só entra aqui o que pode ser usado em **qualquer** módulo sem adaptação. Componentes específicos de uma página ou entidade ficam dentro do módulo em `_components/`.

## Estrutura

```
components/
├── layout/        # Componentes de estrutura visual global (logo, headers)
├── lib/           # Wrappers de bibliotecas externas (ex: VLibras)
├── providers/     # Providers React globais
└── utilities/     # Componentes utilitários de UI (inputs, dialogs, layouts)
```

## Arquivos atuais

| Arquivo                                       | Componente          | Descrição                                      |
| --------------------------------------------- | ------------------- | ---------------------------------------------- |
| `layout/logo.component.tsx`                   | `Logo`              | Logotipo ASGEN                                 |
| `lib/vlibras.component.tsx`                   | `VLibrasComponent`  | Widget VLibras para acessibilidade em Libras   |
| `providers/mui-provider.component.tsx`        | `MuiProvider`       | Provider do tema MUI + Emotion cache           |
| `utilities/confirm-dialog.component.tsx`      | `ConfirmDialog`     | Modal de confirmação padrão                    |
| `utilities/confirm-dialog-blue.component.tsx` | `ConfirmDialogBlue` | Variante azul do modal de confirmação          |
| `utilities/content-layout.component.tsx`      | `ContentLayout`     | Wrapper de layout para conteúdo de páginas     |
| `utilities/form-input.component.tsx`          | `FormInput`         | Input controlado integrado com React Hook Form |
| `utilities/mask-input.component.tsx`          | `MaskInput`         | Input com máscara via react-imask              |
| `utilities/search-bar.component.tsx`          | `SearchBar`         | Barra de busca reutilizável                    |

## Convenções

- Sufixo: `.component.tsx`
- Nome do arquivo em `kebab-case`
- Exportação nomeada preferida a default
- Props tipadas com interface local no mesmo arquivo
