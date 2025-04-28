import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from "../../components/Toasts/Alert";
import { userApi } from "../../api";
import FormFeedback from "../../components/Universal/FormFeedback";

const SignUpPage = () => {
  const navigate = useNavigate();

  // Локальные стейты для значений формы
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Стейт для отображения toast-сообщения
  const [toast, setToast] = useState(null); // { type: string, message: string }
  // Состояние для хранения ошибки регистрации
  const [error, setError] = useState(null);
  // Состояние для ошибок валидации полей
  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Функция для очистки ошибки
  const clearError = () => {
    setError(null);
  };

  // Функция валидации имени
  const validateName = (name, fieldName) => {
    if (!name.trim()) {
      return `${fieldName} обязательно для заполнения`;
    }
    if (name.length < 2) {
      return `${fieldName} должно содержать не менее 2 символов`;
    }
    return "";
  };

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

  // Функция валидации подтверждения пароля
  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) {
      return "Подтверждение пароля обязательно";
    }
    if (confirmPassword !== password) {
      return "Пароли не совпадают";
    }
    return "";
  };

  // Валидация всей формы
  const validateForm = () => {
    const errors = {
      firstName: validateName(firstName, "Имя"),
      lastName: validateName(lastName, "Фамилия"),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(confirmPassword, password),
    };

    setValidationErrors(errors);

    // Возвращает true, если ошибок нет
    return !Object.values(errors).some((error) => error);
  };

  // Обработчики изменения полей с очисткой ошибок
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setValidationErrors((prev) => ({ ...prev, firstName: "" }));
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setValidationErrors((prev) => ({ ...prev, lastName: "" }));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setValidationErrors((prev) => ({ ...prev, email: "" }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setValidationErrors((prev) => ({ ...prev, password: "" }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setValidationErrors((prev) => ({ ...prev, confirmPassword: "" }));
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();

    // Валидируем форму перед отправкой
    if (!validateForm()) {
      return;
    }

    // Формируем объект запроса
    const userRegistrationRequest = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };

    // Вызываем метод register из DefaultApi
    userApi.register(userRegistrationRequest, (error, data) => {
      if (error) {
        console.error("Ошибка при регистрации:", error);
        // Устанавливаем ошибку для отображения в FormFeedback
        setError("Не удалось зарегистрироваться. Пожалуйста, попробуйте позже.");
        
        // Если есть конкретная ошибка от сервера, показываем её
        if (error.status) {
          switch (error.status) {
            case 400:
              setError("Некорректные данные для регистрации.");
              break;
            case 409:
              setError("Пользователь с таким email уже существует.");
              break;
            default:
              setError(`Ошибка сервера (${error.status}). Пожалуйста, попробуйте позже.`);
          }
        }
      } else {
        console.log("Пользователь успешно зарегистрирован:", data);
        // При успешной регистрации перенаправляем, например, на /main
        navigate("/main");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 relative">
      {/* Отображение toast-сообщения */}
      {toast && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-50">
          <Alert
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        </div>
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Создайте аккаунт
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Или{" "}
          <a
            href="/signin"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            войдите в свой аккаунт
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Используем компонент FormFeedback для отображения ошибок */}
          <FormFeedback 
            type="error" 
            message={error} 
            title="Ошибка регистрации" 
            onClose={clearError} 
          />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                Имя
              </label>
              <div className="mt-1">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  placeholder="Введите ваше имя"
                  className={`appearance-none rounded-md block w-full px-3 py-2 border ${
                    validationErrors.firstName 
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                      : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  } placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm`}
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
                {validationErrors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.firstName}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Фамилия
              </label>
              <div className="mt-1">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  placeholder="Введите вашу фамилию"
                  className={`appearance-none rounded-md block w-full px-3 py-2 border ${
                    validationErrors.lastName 
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                      : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  } placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm`}
                  value={lastName}
                  onChange={handleLastNameChange}
                />
                {validationErrors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.lastName}</p>
                )}
              </div>
            </div>

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
                  required
                  placeholder="Введите ваш адрес электронной почты"
                  className={`appearance-none rounded-md block w-full px-3 py-2 border ${
                    validationErrors.email 
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                      : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  } placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm`} 
                  value={email}
                  onChange={handleEmailChange}
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                )}
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
                  required
                  placeholder="Введите ваш пароль"
                  className={`appearance-none rounded-md block w-full px-3 py-2 border ${
                    validationErrors.password 
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                      : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  } placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm`}
                  value={password}
                  onChange={handlePasswordChange}
                />
                {validationErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium text-gray-700"
              >
                Подтвердите пароль
              </label>
              <div className="mt-1">
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  required
                  placeholder="Подтвердите ваш пароль"
                  className={`appearance-none rounded-md block w-full px-3 py-2 border ${
                    validationErrors.confirmPassword 
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                      : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  } placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm`}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {validationErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md 
                           text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Зарегистрироваться
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
