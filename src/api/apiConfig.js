/**
 * Конфигурация для всех API клиентов
 * Позволяет установить базовый URL через переменные окружения
 */

// Получаем базовый URL из переменной окружения или используем значение по умолчанию
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

// Конфигурация для каждого отдельного сервиса
export const apiConfig = {
  // Основной клиент (User, Apartment и т.д.)
  main: {
    baseUrl: `${API_BASE_URL}:8082`,
  },
  // Финансовый сервис
  finance: {
    baseUrl: `${API_BASE_URL}:8086`,
  },
  // Сервис задач
  task: {
    baseUrl: `${API_BASE_URL}:8083`,
  },
  // Сервис штрафов
  penalty: {
    baseUrl: `${API_BASE_URL}:8085`,
  },
};
