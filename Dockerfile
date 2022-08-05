FROM node:latest

#create app directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot


#install dependencies

COPY package.json /usr/src/bot
RUN npm install

COPY . /usr/src/bot

CMD ["node", "index.js"]