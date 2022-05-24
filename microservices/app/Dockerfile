FROM node:14-alpine
# RUN apk add --no-cache python g++ make
WORKDIR /app
# WORKDIR /usr/src/app/
# RUN rm -rf node_modules
COPY ./package.json /app/
RUN npm i
# RUN npm i bcrypt 
COPY . .
RUN npm run build
# COPY ./dist /app/dist
# RUN yarn add bcrypt
# RUN yarn add -D @types/validator
CMD npm run start:prod
