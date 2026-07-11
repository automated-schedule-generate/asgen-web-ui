# docker file for nextjs

FROM node:24-alpine AS base

RUN corepack enable && corepack prepare pnpm@11.11.0 --activate



FROM base AS builder

WORKDIR /app

COPY . .

RUN pnpm install
RUN pnpm approve-builds --all
RUN pnpm build



FROM base AS production

WORKDIR /app

COPY --from=builder /app /app

RUN pnpm install --prod --prefer-frozen-lockfile

RUN cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/


FROM denoland/deno AS runtime

WORKDIR /app

COPY --from=production /app/.next/standalone/ ./
COPY --from=production /app/deno.json ./

RUN deno cache server.js

CMD ["serve", "-A", "--cached-only", "server.js"]
