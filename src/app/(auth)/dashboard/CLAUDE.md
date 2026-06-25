# dashboard/

Painel principal da área autenticada. Primeira tela após o login.

## Rotas

| Arquivo             | URL          | Descrição        |
| ------------------- | ------------ | ---------------- |
| `(routes)/page.tsx` | `/dashboard` | Painel principal |

## Notas

- Rota protegida pelo middleware — redireciona para `/` se sem token
- Ponto de entrada padrão após autenticação
- Adicionar cards de resumo e métricas do sistema neste módulo
