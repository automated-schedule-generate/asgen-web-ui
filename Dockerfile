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

RUN pnpm install --prod --prefer-frozen-lockfile


FROM denoland/deno AS runtime

WORKDIR /app

COPY --from=production /app/.next /app/.next
COPY --from=production /app/public /app/public
COPY --from=production /app/node_modules /app/node_modules
COPY --from=production /app/package.json /app/package.json

RUN cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/

CMD ["serve", "-A", "--node-modules-dir=auto", "--unstable-detect-cjs", ".next/standalone/server.js"]