# utils/

Funções utilitárias puras e globais — sem dependências de React, Next.js ou estado.

## Regras

- Cada arquivo exporta uma ou mais funções relacionadas a um único propósito
- Sufixo obrigatório: `.util.ts`
- Nomes em `kebab-case`
- Sem efeitos colaterais; sem chamadas de API; sem acesso a cookies ou env
- Se a utilidade for específica de um módulo, coloque-a dentro do módulo em `_utils/`

## Arquivos atuais

| Arquivo                          | Função                                    |
| -------------------------------- | ----------------------------------------- |
| `first-letter-uppercase.util.ts` | Capitaliza a primeira letra de uma string |

## Quando adicionar aqui vs. dentro de um módulo

Adicione em `src/utils/` apenas quando a função for reutilizada em **dois ou mais módulos distintos**. Caso contrário, mantenha-a em `src/app/(auth)/<módulo>/_utils/`.
