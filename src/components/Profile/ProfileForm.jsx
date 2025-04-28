import { useRef, useState } from "react";
import CustomButton from "../Universal/CustomButton";
import PropTypes from 'prop-types';

const ProfileForm = ({ user, onPasswordChange, onSubmit }) => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const statusRef = useRef(null);
  
  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  // Функция валидации имени/фамилии
  const validateName = (name, fieldName) => {
    if (!name.trim()) {
      return `${fieldName} обязательно для заполнения`;
    }
    if (name.length < 2) {
      return `${fieldName} должно содержать не менее 2 символов`;
    }
    return "";
  };

  // Функция валидации email
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

  // Функция валидации всех полей
  const validateForm = () => {
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    
    const newErrors = {
      firstName: validateName(firstName, "Имя"),
      lastName: validateName(lastName, "Фамилия"),
      email: validateEmail(email)
    };
    
    setErrors(newErrors);
    
    // Форма валидна, если нет ошибок
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = () => {
    // Валидируем форму перед отправкой
    if (!validateForm()) {
      return;
    }
    
    const updatedUserData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      status: statusRef.current.value
    };
    
    onSubmit(updatedUserData);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Имя */}
        <div>
          <label
            htmlFor="firstName"
            className="block mb-1 text-xs font-medium uppercase tracking-wider"
          >
            ИМЯ
          </label>
          <input
            id="firstName"
            type="text"
            defaultValue={user.firstName}
            placeholder="Введите имя"
            ref={firstNameRef}
            className={`w-full px-3 py-2 border rounded ${
              errors.firstName ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-600"
            } focus:outline-none`}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        {/* Фамилия */}
        <div>
          <label
            htmlFor="lastName"
            className="block mb-1 text-xs font-medium uppercase tracking-wider"
          >
            ФАМИЛИЯ
          </label>
          <input
            id="lastName"
            type="text"
            defaultValue={user.lastName}
            placeholder="Введите фамилию"
            ref={lastNameRef}
            className={`w-full px-3 py-2 border rounded ${
              errors.lastName ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-600"
            } focus:outline-none`}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>

        {/* Электронная почта */}
        <div>
          <label
            htmlFor="email"
            className="block mb-1 text-xs font-medium uppercase tracking-wider"
          >
            ЭЛЕКТРОННАЯ ПОЧТА
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center">
              @
            </span>
            <input
              id="email"
              type="email"
              defaultValue={user.email}
              placeholder="name@example.com"
              ref={emailRef}
              className={`w-full pl-9 pr-3 py-2 border rounded ${
                errors.email ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-600"
              } focus:outline-none`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Статус */}
        <div>
          <label
            htmlFor="status"
            className="block mb-1 text-xs font-medium uppercase tracking-wider"
          >
            СТАТУС
          </label>
          <select
            id="status"
            defaultValue={user.status}
            ref={statusRef}
            className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:border-indigo-600"
          >
            <option value="ACTIVE">Активен</option>
            <option value="AWAY">В отпуске</option>
            <option value="SICK">Заболел</option>
          </select>
        </div>

        {/* Кнопка изменения пароля */}
        <div className="md:col-span-2">
          <CustomButton
            text="Изменить пароль"
            variant="outlined"
            onClick={onPasswordChange}
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CustomButton text="Сохранить" onClick={handleSubmit} variant="filled" />
      </div>
    </div>
  );
};

ProfileForm.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    status: PropTypes.string
  }).isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ProfileForm;
