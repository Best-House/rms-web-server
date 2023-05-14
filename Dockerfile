FROM node:16-alpine 
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY ./public /app/public 
COPY --chown=nextjs:nodejs ./.next/standalone /app
COPY --chown=nextjs:nodejs ./.next/static /app/.next/static 

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]