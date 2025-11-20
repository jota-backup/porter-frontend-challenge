FROM node:24-alpine AS build
RUN corepack enable

COPY . /app
WORKDIR /app
ENV CI=true
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM nginx:alpine
RUN mkdir -p /app/www
COPY --from=build /app/dist /app/www
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx:nginx /app/www /var/cache/nginx && \
    touch /var/run/nginx.pid && \
    chown nginx:nginx /var/run/nginx.pid
EXPOSE 8080
USER nginx
CMD ["nginx", "-g", "daemon off;"]
