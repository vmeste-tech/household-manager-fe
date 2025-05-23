import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Позволяет слушать все сетевые интерфейсы (0.0.0.0)
    port: 4173, // Устанавливает порт для разработки
    strictPort: true, // Завершает процесс, если порт занят, вместо попытки найти другой
    allowedHosts: ["vmeste.tech", "www.vmeste.tech"], // Разрешает доступ с указанных доменов
  },
  preview: {
    host: true, // Также слушает все сетевые интерфейсы для режима preview
    port: 4173, // Тот же порт для режима preview
    strictPort: true, // Также строгая проверка порта
    allowedHosts: ["vmeste.tech", "www.vmeste.tech"], // Те же разрешенные домены
  },
});
