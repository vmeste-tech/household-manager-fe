/**
 * Конфигурация для всех API клиентов
 * Позволяет установить базовый URL через переменные окружения
 */

// Получаем базовый URL из переменной окружения или используем значение по умолчанию
const API_BASE_URL = "http://localhost";

// Конфигурация для каждого отдельного сервиса
export const apiConfig = {
  // Сервис пользователей
  main: {
    baseUrl: `${API_BASE_URL}:8082`,
  },
  // Сервис задач
  task: {
    baseUrl: `${API_BASE_URL}`,
  },
  // Сервис правил
  rule: {
    baseUrl: `${API_BASE_URL}`,
  },
  // Сервис штрафов
  penalty: {
    baseUrl: `${API_BASE_URL}`,
  },
  // Финансовый сервис
  finance: {
    baseUrl: `${API_BASE_URL}`,
  },
  // Сервис уведомлений
  notification: {
    baseUrl: `${API_BASE_URL}`,
  }
};
