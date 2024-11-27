FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci
COPY . .
# 開発者モード
# CMD ["npm", "start"]
# アプリケーション開始
CMD ["npm", "run", "dev"]