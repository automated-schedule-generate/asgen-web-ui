# lib/

Configurações e instâncias de bibliotecas externas.

## Regras

- Um arquivo por biblioteca configurada
- Sem lógica de negócio; apenas setup e export de instâncias/configurações
- Importar daqui ao usar a biblioteca, nunca reconfigurar inline nos componentes

## Arquivos atuais

| Arquivo    | Descrição                       |
| ---------- | ------------------------------- |
| `theme.ts` | Tema customizado do Material UI |

## theme.ts

Define o tema global MUI usando `createTheme`. Paleta:

| Token                | Valor                  |
| -------------------- | ---------------------- |
| `primary.main`       | `#1a1a1a` (preto)      |
| `secondary.main`     | `#03017d` (azul ASGEN) |
| `background.default` | `#e8edf5`              |

O tema habilita CSS Variables (`cssVariables: true`). Use `var(--mui-palette-*)` nos overrides de estilos em vez de hardcodar cores.

Nunca sobrescrever cores do tema diretamente em `sx` ou `style` nos componentes — use os tokens do tema via `theme.palette` ou variáveis CSS MUI.
