# assets/

Arquivos estáticos: imagens, SVGs, fontes e outros recursos visuais.

## Regras

- Importar via caminho absoluto com alias `@/assets/` nos componentes
- Imagens usadas pelo Next.js Image Optimization devem ficar aqui (não em `public/` se forem importadas como módulo)
- Arquivos em `public/` são servidos diretamente pela URL sem processamento — use para favicons, robots.txt, etc.
- Não colocar arquivos `.ts`/`.tsx` aqui
