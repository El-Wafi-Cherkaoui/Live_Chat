FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install
RUN npm audit fix

COPY . .

EXPOSE 4000
EXPOSE 4001

RUN npm run build

RUN npm install -g concurrently
CMD ["concurrently", "npm:preview", "npm:server"]
