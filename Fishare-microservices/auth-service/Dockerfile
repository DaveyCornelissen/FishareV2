FROM node:10

WORKDIR /Fishare-AuthService

ADD package.json /Fishare-AuthService/package.json

RUN npm config set registry http://registry.npmjs.org

RUN npm install

ADD . /Fishare-AuthService

EXPOSE 3000

CMD ["npm", "run", "start"]
