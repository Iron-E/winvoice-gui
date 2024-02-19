FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps

# SEE: https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Package json is needed in subsequent steps, so copy it over. Lockfile is bound in run step
COPY package.json .

# Install dependencies based on the preferred package manager
RUN --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN --mount=type=bind,from=deps,source=/app/node_modules,target=./node_modules \
    npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

ARG GID=1001
ARG UID=$GID

RUN addgroup --system --gid "${GID}" nodejs && \
    adduser --system --uid "${UID}" nextjs && \
    # Set the correct permission for prerender cache
    mkdir .next && \
    chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

EXPOSE $PORT

CMD ["node", "server.js"]
