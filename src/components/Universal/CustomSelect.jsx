import PropTypes from "prop-types";

function CustomSelect({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  className,
}) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`mt-1 block w-full border border-gray-300 rounded-md p-2 pr-8 appearance-none ${className}`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        {/* Стрелка для выпадающего списка */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

CustomSelect.propTypes = {
  /** HTML-идентификатор поля */
  id: PropTypes.string.isRequired,
  /** Заголовок (label) над селектом */
  label: PropTypes.string,
  /** Текущее значение (id выбранного варианта) */
  value: PropTypes.string,
  /** Обработчик изменения значения */
  onChange: PropTypes.func,
  /** Массив опций: [{ id: string, name: string }, ...] */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  /** Текст по умолчанию для первого варианта (placeholder) */
  placeholder: PropTypes.string,
  /** Дополнительные классы Tailwind */
  className: PropTypes.string,
};

CustomSelect.defaultProps = {
  label: "",
  value: "",
  onChange: () => {},
  options: [],
  placeholder: "Не выбрано",
  className: "",
};

export default CustomSelect;
