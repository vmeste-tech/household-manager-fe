import { useNavigate } from "react-router-dom";
import { userApi } from "../../api";
import { useState } from "react";
import PropTypes from "prop-types";

const SignInPage = ({ setLoggedIn, setEmail }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Добавляем функцию для закрытия сообщения об ошибке
  const clearError = () => {
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Получаем значения полей формы
    const form = e.currentTarget;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    // Формируем объект запроса. В сгенерированном клиенте AuthRequest ожидает поля "username" и "password"
    const authRequest = {
      username: email, // используем email в качестве имени пользователя
      password: password,
    };

    try {
      const loginPromise = new Promise((resolve, reject) => {
        userApi.login(authRequest, (error, data) => {
          if (error) {
            // Сохраняем дополнительную информацию об ошибке
            reject(error);
          } else {
            resolve(data);
          }
        });
      });

      const data = await loginPromise;
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      // Обновляем состояние авторизации в App
      setLoggedIn(true);
      setEmail(email);

      navigate('/main');
    } catch (err) {
      console.error("Ошибка аутентификации:", err);
      
      // Определяем тип ошибки и устанавливаем соответствующее сообщение
      if (err.status) {
        switch (err.status) {
          case 400:
            setError("Некорректные данные. Проверьте правильность введённого email и пароля.");
            break;
          case 401:
            setError("Неверный email или пароль. Пожалуйста, проверьте введённые данные.");
            break;
          case 403:
            setError("Доступ запрещён. Ваша учётная запись может быть заблокирована.");
            break;
          case 404:
            setError("Пользователь с таким email не найден.");
            break;
          default:
            setError(`Ошибка сервера (${err.status}). Пожалуйста, попробуйте позже.`);
        }
      } else if (err.message && err.message.includes("Network Error")) {
        setError("Ошибка подключения к серверу. Проверьте подключение к интернету.");
      } else {
        setError("Не удалось выполнить вход. Пожалуйста, попробуйте позже.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Войдите в свой аккаунт
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Или{" "}
          <a
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            создайте аккаунт
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded relative" role="alert">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-grow">
                  <p className="font-medium">Ошибка входа</p>
                  <p className="text-sm">{error}</p>
                </div>
                <button 
                  onClick={clearError} 
                  className="text-red-700 hover:text-red-900"
                  aria-label="Закрыть"
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Адрес электронной почты
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Введите ваш адрес электронной почты"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Пароль
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Введите ваш пароль"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Запомнить меня
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Забыли пароль?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Загрузка...
                  </span>
                ) : (
                  "Войти"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

SignInPage.propTypes = {
  setLoggedIn: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired
};

export default SignInPage;
