FROM node as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build/ /usr/share/nginx/html/