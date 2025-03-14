import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../api/api";
import TextInput from "../../components/Universal/TextInput";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Валидация: обрезаем пробелы и проверяем совпадение паролей
    if (data.password !== data.confirm_password) {
      setError("Пароли не совпадают");
      setIsLoading(false);
      return;
    }

    const userData = {
      email: data.email.trim(),
      password: data.password,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
    };

    try {
      await registerUser(userData);
      navigate("/signin");
    } catch (err) {
      console.error("Ошибка регистрации:", err);
      setError(err.message || "Произошла ошибка при регистрации");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Создайте аккаунт
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Или{" "}
          <Link
            to="/signin"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            войдите в свой аккаунт
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextInput
              id="firstName"
              name="firstName"
              label="Имя"
              placeholder="Введите ваше имя"
              required
              autoComplete="given-name"
            />
            <TextInput
              id="lastName"
              name="lastName"
              label="Фамилия"
              placeholder="Введите вашу фамилию"
              required
              autoComplete="family-name"
            />
            <TextInput
              id="email"
              name="email"
              type="email"
              label="Адрес электронной почты"
              placeholder="Введите ваш email"
              required
              autoComplete="email"
            />
            <TextInput
              id="password"
              name="password"
              type="password"
              label="Пароль"
              placeholder="Пароль (минимум 8 символов)"
              required
              autoComplete="new-password"
            />
            <TextInput
              id="confirm_password"
              name="confirm_password"
              type="password"
              label="Подтвердите пароль"
              placeholder="Повторите ваш пароль"
              required
              autoComplete="new-password"
            />
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? "Регистрация..." : "Зарегистрироваться"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
