FROM node:16 As build

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/src/main"]