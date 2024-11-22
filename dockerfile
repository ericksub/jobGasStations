FROM node:21-alpine3.18
ENV NODE_ENV=job

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

RUN npm run tsc

EXPOSE 4200

CMD ["npm", "start"]