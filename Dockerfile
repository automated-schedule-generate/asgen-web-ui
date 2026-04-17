# docker file for nextjs

FROM node:24-alpine AS base

RUN corepack enable && corepack prepare pnpm@latest --activate



FROM base AS builder

WORKDIR /app

COPY . .

RUN pnpm install
RUN pnpm build



FROM base AS production

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3000

CMD ["pnpm", "start"]