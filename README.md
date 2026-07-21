# GitHub Actions — Tutorial

Este projeto usa [GitHub Actions](https://docs.github.com/actions) para automatizar validações e o build/publicação da imagem Docker. Os workflows ficam em `.github/workflows/*.yml` e são disparados automaticamente por eventos do GitHub (push, pull request, criação de tag).

## O que é um workflow

Um workflow é um arquivo YAML que descreve:

- **`on`** — quais eventos disparam a execução (push, pull_request, tag, etc.)
- **`jobs`** — um ou mais conjuntos de passos (`steps`) que rodam em uma máquina virtual (`runs-on`)

Cada `step` executa um comando de shell (`run`) ou uma "action" reutilizável (`uses`).

## Workflows existentes neste repositório

### 1. `validate-branch.yml` — Validação de nome de branch

**Dispara em:** todo `push` (qualquer branch) e todo `pull_request`.

**O que faz:** verifica se o nome da branch segue o padrão do projeto:

```
(feat|feature|fix|hotfix|release|bugfix|docs|refactor|test)/<descricao-em-kebab-case>
```

Exemplos válidos: `feat/add-login-form`, `fix/bug-timetable`, `docs/tutorial-actions`.

Se o nome não bater com o padrão, o job falha (`exit 1`) e aparece um ❌ no PR ou no commit. Isso serve como um "gate" antes de mesclar — corrija o nome da branch (ou renomeie/recrie-a) para o workflow passar.

**Como testar localmente antes de dar push:**

```bash
git branch --show-current
# deve estar no formato prefixo/descricao-kebab-case
```

### 2. `front-build.yml` — Build & Push da imagem Docker

**Dispara em:** push de uma **tag** no formato semver, ex: `v1.2.3` ou `v1.2.3-beta`.

**O que faz:**

1. Faz checkout do código
2. Autentica no GitHub Container Registry (`ghcr.io`) usando o `GITHUB_TOKEN` automático
3. Builda a imagem a partir do `Dockerfile` na raiz do projeto
4. Publica em `ghcr.io/<owner>/asgen-web-ui` com as tags:
   - a tag exata (`v1.2.3`)
   - `latest` (automático via `docker/metadata-action`)
5. Usa cache do GitHub Actions (`type=gha`) para acelerar builds seguintes

**Como disparar uma release:**

```bash
git tag v1.2.3
git push origin v1.2.3
```

> Só tags que combinam com `v[0-9]+.[0-9]+.[0-9]+*` disparam o build. Um push normal de commit/branch **não** aciona este workflow.

## Onde acompanhar as execuções

Aba **Actions** do repositório no GitHub, ou:

```bash
gh run list
gh run view <run-id> --log
```

## Como criar um novo workflow

1. Crie um arquivo `.github/workflows/<nome>.yml`
2. Defina o gatilho (`on`) e o(s) job(s)
3. Teste o YAML localmente com `actionlint` (opcional) ou apenas abra um PR de teste em uma branch descartável
4. Lembre-se: o nome da branch usada para testar também precisa passar em `validate-branch.yml`

### Estrutura mínima de exemplo

```yaml
name: Nome do Workflow

on:
  push:
    branches:
      - developer

jobs:
  meu-job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Rodar algo
        run: echo "Olá, Actions!"
```
