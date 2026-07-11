---
name: prime-context
description: Carrega todo o contexto do projeto (todos os CLAUDE.md e todas as skills) uma única vez no início da conversa; depois disso, nada deve ser relido durante a sessão, a menos que o usuário peça ou os arquivos mudem.
---

# Prime Context

Carrega o contexto completo do projeto **uma única vez por conversa**. Depois de executada, todo o conteúdo lido deve ser tratado como já conhecido — sem releituras.

## Passos

1. Localize todos os `CLAUDE.md` do projeto (ignorando `node_modules`):

   ```bash
   find . -name 'CLAUDE.md' -not -path '*/node_modules/*'
   ```

2. Leia cada `CLAUDE.md` encontrado que ainda não esteja no contexto. Se o harness indicar que um arquivo já está em contexto, **não** o leia de novo.

3. Localize e leia todas as skills do projeto:

   ```bash
   find .claude/skills -name 'SKILL.md'
   ```

4. Ao final, responda com um resumo curto (1 parágrafo) confirmando o que foi carregado: quantos `CLAUDE.md`, quais módulos e quais skills.

## Regras para o restante da conversa

- **NÃO** releia nenhum `CLAUDE.md` nem nenhuma skill já carregada — use o que está em contexto.
- Releia um arquivo somente se:
  - o usuário pedir explicitamente; ou
  - você mesmo editar esse arquivo durante a conversa (releia apenas o arquivo alterado); ou
  - uma nova conversa for iniciada (o contexto zera e a skill deve ser executada de novo).
- Ao precisar de uma convenção do projeto (nomenclatura, estrutura de módulo, formulários, API), consulte o conteúdo já carregado em vez de buscar no disco.
