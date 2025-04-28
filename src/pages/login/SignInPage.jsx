import { useNavigate } from "react-router-dom";
import { userApi } from "../../api";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FormFeedback from "../../components/Universal/FormFeedback";
import FormInput from "../../components/Universal/FormInput";

const SignInPage = ({ setLoggedIn, setEmail }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: ''
  });

  // Set a flag in localStorage to indicate we're on the login page
  // This will be used by any auth interceptors to avoid token refresh attempts
  useEffect(() => {
    localStorage.setItem("is_login_page", "true");
    
    // Clean up when leaving the page
    return () => {
      localStorage.removeItem("is_login_page");
    };
  }, []);

  // Функция валидации электронной почты
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email обязателен";
    }
    if (!emailRegex.test(email)) {
      return "Неверный формат email";
    }
    return "";
  };

  // Функция валидации пароля
  const validatePassword = (password) => {
    if (!password) {
      return "Пароль обязателен";
    }
    if (password.length < 8) {
      return "Пароль должен содержать не менее 8 символов";
    }
    return "";
  };

  // Валидация всей формы
  const validateForm = () => {
    const errors = {
      email: validateEmail(formValues.email),
      password: validatePassword(formValues.password)
    };
    
    setValidationErrors(errors);
    
    // Возвращает true, если ошибок нет
    return !errors.email && !errors.password;
  };

  // Обработчик изменений полей ввода
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Сбрасываем ошибку валидации при изменении поля
    setValidationErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  // Добавляем функцию для закрытия сообщения об ошибке
  const clearError = () => {
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Проверяем валидность формы
    if (!validateForm()) {
      // Если форма невалидна, прерываем выполнение
      return;
    }
    
    setIsLoading(true);
    setError(null);

    // Формируем объект запроса. В сгенерированном клиенте AuthRequest ожидает поля "username" и "password"
    const authRequest = {
      username: formValues.email, // используем email в качестве имени пользователя
      password: formValues.password,
    };

    try {
      const loginPromise = new Promise((resolve, reject) => {
        // Using a direct API call without automatically handling 401
        userApi.login(authRequest, (error, data) => {
          if (error) {
            // Prevent any automatic refresh token logic
            error.noRefresh = true;
            reject(error);
          } else {
            resolve(data);
          }
        });
      });

      const data = await loginPromise;
      // Remove the login page flag
      localStorage.removeItem("is_login_page");
      
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      // Обновляем состояние авторизации в App
      setLoggedIn(true);
      setEmail(formValues.email);

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
          {/* Используем компонент FormFeedback для отображения ошибок */}
          <FormFeedback 
            type="error" 
            message={error} 
            title="Ошибка входа" 
            onClose={clearError} 
          />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              id="email"
              name="email"
              type="email"
              label="Адрес электронной почты"
              placeholder="Введите ваш адрес электронной почты"
              value={formValues.email}
              onChange={handleInputChange}
              autoComplete="email"
              required
              validations={{ email: true }}
              error={validationErrors.email}
            />

            <FormInput
              id="password"
              name="password"
              type="password"
              label="Пароль"
              placeholder="Введите ваш пароль"
              value={formValues.password}
              onChange={handleInputChange}
              autoComplete="current-password"
              required
              validations={{ minLength: 8 }}
              error={validationErrors.password}
            />

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
