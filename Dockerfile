# Указываем конкретную версию Node.js
FROM node:22.2.0-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (если есть) в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта в контейнер
COPY . .

# Аргумент для базового URL API при сборке
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Собираем приложение для продакшена
RUN npm run build

# Устанавливаем сервер для обслуживания статических файлов
RUN npm install -g serve

# Экспонируем порт для доступа к приложению
EXPOSE 4173

# Запускаем приложение в продакшене
CMD ["serve", "-s", "dist", "-l", "4173"]