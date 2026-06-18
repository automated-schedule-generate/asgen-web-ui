# interfaces/

Interfaces TypeScript globais — contratos de tipos compartilhados entre múltiplos módulos.

## Regras

- Sufixo obrigatório: `.interface.ts`
- Prefixo `I` no nome da interface (ex: `IUser`, `IResponseRequest`)
- Interfaces específicas de um módulo ficam em `src/app/(auth)/<módulo>/_interfaces/` ou como `_types/`
- Sem lógica; apenas tipos e interfaces

## Arquivos atuais

| Arquivo                         | Interface             | Descrição                                                     |
| ------------------------------- | --------------------- | ------------------------------------------------------------- |
| `user.interface.ts`             | `IUser`               | Dados básicos do usuário (id, nome, email, funcao, matricula) |
| `response-request.interface.ts` | `IResponseRequest<T>` | Envelope padrão de resposta da API                            |

## IResponseRequest

Envelope genérico retornado pela API em todas as respostas:

```ts
interface IResponseRequest<DATA_TYPE> {
  success: boolean;
  data: DATA_TYPE;
  statusCode: number;
  message: string;
}
```

Usar este tipo ao tipar o retorno das funções de serviço quando a API segue este contrato.
