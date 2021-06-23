FROM node:14-alpine

WORKDIR /usr/app

# ENV
ENV NODE_PATH=dist
ENV TZ="Asia/Seoul"
RUN date

# COPY for install modules
COPY package*.json ./
COPY yarn.lock ./

# INSTALL node_modules
RUN yarn install && yarn add typescript

# INSTALL others
COPY . .
RUN yarn build

# CMD setting
EXPOSE 8080
CMD ["node", "dist/index.js"]

