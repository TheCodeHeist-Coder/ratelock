# ---- build stage ----
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
COPY prisma.config.ts tsconfig.json ./
COPY src ./src

RUN npx prisma generate
RUN npm run build

# ---- runtime stage ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache openssl

COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./

EXPOSE 4000

# apply migrations, then boot
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
