import { useNavigate } from "react-router-dom";
import ApiClient from "../../generated-client-js/src/ApiClient";
import DefaultApi from "../../generated-client-js/src/api/DefaultApi";
import { useState } from "react";
import Alert from "../../components/Toasts/Alert";

const SignUpPage = () => {
  const navigate = useNavigate();

  // Локальные стейты для значений формы
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Стейт для отображения toast-сообщения
  const [toast, setToast] = useState(null); // { type: string, message: string }

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверяем, что пароли совпадают
    if (password !== confirmPassword) {
      setToast({ type: "danger", message: "Пароли не совпадают!" });
      return;
    }

    // Разделяем fullName на firstName и lastName (по желанию)
    const [firstName, ...rest] = fullName.split(" ");
    const lastName = rest.join(" ");

    // Создаём экземпляр ApiClient
    const apiClient = new ApiClient();
    // Задаём базовый URL для запросов
    apiClient.basePath = "http://localhost:8082";

    // Создаём экземпляр DefaultApi
    const defaultApi = new DefaultApi(apiClient);

    // Формируем объект запроса
    const userRegistrationRequest = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };

    // Вызываем метод register из DefaultApi
    defaultApi.register(userRegistrationRequest, (error, data) => {
      if (error) {
        console.error("Ошибка при регистрации:", error);
        setToast({
          type: "danger",
          message: "Не удалось зарегистрироваться. Попробуйте ещё раз.",
        });
      } else {
        console.log("Пользователь успешно зарегистрирован:", data);
        // При успешной регистрации перенаправляем, например, на /main
        navigate("/main");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Полное имя
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Введите ваше полное имя"
                  className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 
                             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
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
                  className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 
                             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  required
                  placeholder="Введите ваш пароль"
                  className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 
                             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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
                  className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 
                             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
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
