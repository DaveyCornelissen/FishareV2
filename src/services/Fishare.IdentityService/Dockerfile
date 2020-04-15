FROM node:latest

WORKDIR /app

ADD package.json /app/package.json

RUN npm config set registry http://registry.npmjs.org

RUN npm install

ADD . /app

EXPOSE 6000

CMD ["npm", "run", "start"]