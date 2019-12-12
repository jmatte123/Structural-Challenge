FROM node:12.6.0

WORKDIR /app

COPY ./package.json .

EXPOSE 4000

RUN npm install

CMD ["npm", "start"]