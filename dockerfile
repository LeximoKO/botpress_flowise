FROM node:14

# Установите зависимости
WORKDIR /app
COPY package*.json ./
RUN npm install

# Скопируйте все файлы
COPY . .

# Экспозируйте порт
EXPOSE 3000

# Запустите приложение
CMD ["node", "index.js"]

