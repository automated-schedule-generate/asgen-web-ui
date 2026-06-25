# plugin/

Utilitários server-side de infraestrutura. Todos os arquivos usam `'use server'`.

## Regras

- Nunca importar estes arquivos em Client Components (`'use client'`)
- Nunca instanciar axios ou acessar `process.env` diretamente fora desta pasta
- Sufixo obrigatório: `.plugin.ts`

## Arquivos atuais

| Arquivo            | Exportações                              | Descrição                                                         |
| ------------------ | ---------------------------------------- | ----------------------------------------------------------------- |
| `api.plugin.ts`    | `getApi()`                               | Instância axios com HTTP/2, baseURL da env e interceptor de token |
| `cookie.plugin.ts` | `getCookie`, `setCookie`, `deleteCookie` | Leitura e escrita de cookies via `next/headers`                   |
| `env.plugin.ts`    | `getEnv()`                               | Acesso tipado às variáveis de ambiente                            |

## api.plugin

`getApi()` retorna um cliente axios configurado com:

- `baseURL` de `API_URL` (env)
- Adaptador HTTP/2 via `axios-http2-adapter`
- Interceptor que injeta `Authorization: Bearer <token>` automaticamente se o cookie `token` existir

**Sempre usar `getApi()` dentro de Server Actions**, nunca fora delas.

## env.plugin

Variáveis de ambiente disponíveis via `getEnv()`:

| Chave     | Default                  |
| --------- | ------------------------ |
| `api_url` | `https://localhost:8000` |

Defina `API_URL` no `.env.local` para desenvolvimento.
