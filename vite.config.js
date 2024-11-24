import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Позволяет слушать все сетевые интерфейсы (0.0.0.0)
    port: 4173, // Устанавливает порт для разработки или preview
  }
})
