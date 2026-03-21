# 📦 Módulos da Aplicação

Esta pasta contém os **módulos do sistema**.
A arquitetura segue um padrão **modular (feature-based)**, onde **cada funcionalidade ou entidade possui sua própria estrutura isolada**.

Isso facilita:

- manutenção do código
- escalabilidade da aplicação
- isolamento de responsabilidades
- reutilização de componentes e lógica

Cada módulo concentra **componentes, hooks, serviços, utilidades e rotas** relacionados à mesma funcionalidade.

---

# 🧩 Estrutura de um Módulo

Abaixo está um exemplo da estrutura recomendada para um módulo chamado **`user`**.

```text
user
├─ components/          # Componentes React específicos do módulo
│  ├─ user-form.component.tsx
│  └─ user-card.component.tsx
│
├─ services/            # Integração com API e lógica de serviços
│  └─ user.service.ts
│
├─ hooks/               # Custom hooks exclusivos do módulo
│  └─ use-user.hook.ts
│
├─ utils/               # Funções utilitárias e helpers
│  └─ format-user.util.ts
│
├─ types/               # Tipagens e interfaces do domínio
│  └─ user.type.ts
│
├─ styles/              # Arquivos de estilização (CSS/SCSS)
│  ├─ user.style.css
│  └─ user.style.scss
│
├─ (routes)/            # Rotas relacionadas ao módulo
│  ├─ page.tsx          # Listagem ou página principal do módulo
│  │
│  ├─ create/           # Rota para criação de novos itens
│  │  └─ page.tsx
│  │
│  └─ [id]/             # Rota dinâmica para detalhes ou edição
│     └─ page.tsx
```

---

# 📍 Organização das Rotas

As rotas ficam dentro da pasta **`(routes)`**, permitindo separar a lógica de navegação da lógica do módulo.

Exemplo de URLs geradas:

| Rota           | Descrição                         |
| -------------- | --------------------------------- |
| `/user`        | Listagem de usuários              |
| `/user/create` | Criação de usuário                |
| `/user/:id`    | Visualização ou edição de usuário |

---

# 🎯 Objetivo da Arquitetura

Essa estrutura garante que **cada módulo seja autocontido**, contendo tudo o que precisa para funcionar.

Vantagens principais:

- 📁 **Organização por domínio**
- 🔒 **Baixo acoplamento entre módulos**
- 🚀 **Escalabilidade do projeto**
- 🧠 **Facilidade de navegação no código**

---

# 💡 Convenção Recomendada

Sempre que possível:

- componentes devem ficar dentro de `components`
- chamadas de API em `services`
- hooks reutilizáveis dentro do módulo em `hooks`
- helpers em `utils`
- tipagens em `types`
- arquivos de estilos em `styles`
- páginas em `(routes)`

Assim mantemos **consistência entre todos os módulos do sistema**.
