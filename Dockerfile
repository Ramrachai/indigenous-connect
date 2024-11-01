# stage 1
FROM node:20-alpine AS base

# stage 2
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json  pnpm-lock.yaml*  ./
COPY .env . 
COPY .env.local .
RUN npm i -g pnpm
RUN pnpm install

# stage 3
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm i -g pnpm 
RUN pnpm run build

# stage 4
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=builder  /app/.next/standalone ./
COPY --from=builder  /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=5000
ENV HOSTNAME="localhost"
CMD ["node", "server.js"] 