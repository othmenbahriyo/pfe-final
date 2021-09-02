FROM node:10.16.0 as node
WORKDIR /app
COPY . .
RUN npm run build --prod
RUN npm install


FROM nginx:1.16.0-alpine as prod-stage
COPY --from=node /app/dist/pfe /usr/share/nginx/html
EXPOSE 4200
CMD ["nginx", "-g" , "daemon off;"]