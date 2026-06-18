# contexts/

React Contexts globais — estado compartilhado entre múltiplos módulos que não cabe em um único componente.

## Regras

- Todo arquivo de contexto deve exportar: o Provider, o hook de consumo e (opcionalmente) o tipo do contexto
- Sempre lançar erro no hook quando usado fora do Provider
- Contexts são sempre `'use client'` — nunca server-side
- Sufixo recomendado: `.context.tsx`
- Se o contexto for exclusivo de um módulo, coloque-o dentro do módulo

## Arquivos atuais

| Arquivo            | Descrição                                                  |
| ------------------ | ---------------------------------------------------------- |
| `user.context.tsx` | Contexto do usuário autenticado: `UserProvider`, `useUser` |

## UserContext

Fornece os dados do usuário logado para toda a árvore dentro do layout `(auth)`. Inicializado no Server Component do layout com os dados do usuário via `me()`, passados como `currentUser` ao `UserProvider`.

```tsx
// Consumo
const { user, setUser } = useUser();
```

O campo `user` pode ser `null` quando o backend está offline — tratar esse caso nos componentes.
