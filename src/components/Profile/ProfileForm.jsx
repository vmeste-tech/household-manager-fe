import CustomButton from "../Universal/CustomButton";
import PropTypes from 'prop-types';

const ProfileForm = ({ user, onPasswordChange, onSubmit }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
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
            className="w-full px-3 py-2 border rounded !border-gray-300 focus:outline-none focus:!border-indigo-600"
          />
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
            className="w-full px-3 py-2 border rounded !border-gray-300 focus:outline-none focus:!border-indigo-600"
          />
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
              className="w-full pl-9 pr-3 py-2 border rounded !border-gray-300 focus:outline-none focus:!border-indigo-600"
            />
          </div>
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
            className="w-full px-3 py-2 border rounded !border-gray-300 focus:outline-none focus:!border-indigo-600"
          >
            <option>Активен</option>
            <option>В отпуске</option>
            <option>Заболел</option>
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
        <CustomButton text="Сохранить" variant="filled" type="submit" />
      </div>
    </form>
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
  onSubmit: PropTypes.func.isRequired
};

export default ProfileForm;
