# ⚠️ MÓDULO DE EXEMPLO (NÃO UTILIZAR)

Este diretório é apenas um **template de referência**. Ele não deve ser utilizado como um módulo real da aplicação.

## Propósito

Demonstrar a **Arquitetura Modular (feature-based)** do projeto, conforme definido no [README principal da pasta app](../README.md).

## Estrutura Implementada:

- **\_components/**: `example-form.component.tsx`, `example-card.component.tsx`
- **\_services/**: `example.service.ts`
- **\_hooks/**: `use-example.hook.ts`
- **\_utils/**: `format-example.util.ts`
- **\_types/**: `example.type.ts`
- **\_styles/**: `example.style.css`, `example.style.scss`
- **(routes)/**: Estrutura de rotas isolada (`page.tsx`, `create/`, `[id]/`)

> [!IMPORTANT]
> A pasta utiliza o prefixo `_` (`_example-module`) para ser tratada como um [Private Folder](https://nextjs.org/docs/app/building-your-application/routing/colocation#private-folders) pelo Next.js App Router, o que impede a criação de rotas baseadas nestas pastas.
