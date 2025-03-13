import PropTypes from "prop-types";

// Объект для сопоставления категорий со SVG-иконками
const iconMapping = {
  задачи: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-full w-full text-white"
    >
      {/* Иконка "галочка" */}
      <polyline
        points="20 6 9 17 4 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  правила: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      className="h-full w-full text-white"
    >
      <path
        fill="currentColor"
        d="m25.7 9.3l-7-7A.908.908 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.908.908 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z"
      ></path>
    </svg>
  ),
  штрафы: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="h-full w-full text-white"
    >
      <path
        fill="currentColor"
        d="M8 21h2v-3h6v-2h-6v-2h4.5c2.757 0 5-2.243 5-5s-2.243-5-5-5H9a1 1 0 0 0-1 1v7H5v2h3v2H5v2h3zm2-15h4.5c1.654 0 3 1.346 3 3s-1.346 3-3 3H10z"
      ></path>
    </svg>
  ),
  затраты: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1024"
      height="1024"
      viewBox="0 0 1024 1024"
      className="h-full w-full text-white"
    >
      <path
        fill="currentColor"
        d="M251.2 387H320v68.8c0 1.8 1.8 3.2 4 3.2h48c2.2 0 4-1.4 4-3.3V387h68.8c1.8 0 3.2-1.8 3.2-4v-48c0-2.2-1.4-4-3.3-4H376v-68.8c0-1.8-1.8-3.2-4-3.2h-48c-2.2 0-4 1.4-4 3.2V331h-68.8c-1.8 0-3.2 1.8-3.2 4v48c0 2.2 1.4 4 3.2 4m328 0h193.6c1.8 0 3.2-1.8 3.2-4v-48c0-2.2-1.4-4-3.3-4H579.2c-1.8 0-3.2 1.8-3.2 4v48c0 2.2 1.4 4 3.2 4m0 265h193.6c1.8 0 3.2-1.8 3.2-4v-48c0-2.2-1.4-4-3.3-4H579.2c-1.8 0-3.2 1.8-3.2 4v48c0 2.2 1.4 4 3.2 4m0 104h193.6c1.8 0 3.2-1.8 3.2-4v-48c0-2.2-1.4-4-3.3-4H579.2c-1.8 0-3.2 1.8-3.2 4v48c0 2.2 1.4 4 3.2 4m-195.7-81l61.2-74.9c4.3-5.2.7-13.1-5.9-13.1H388c-2.3 0-4.5 1-5.9 2.9l-34 41.6l-34-41.6a7.85 7.85 0 0 0-5.9-2.9h-50.9c-6.6 0-10.2 7.9-5.9 13.1l61.2 74.9l-62.7 76.8c-4.4 5.2-.8 13.1 5.8 13.1h50.8c2.3 0 4.5-1 5.9-2.9l35.5-43.5l35.5 43.5c1.5 1.8 3.7 2.9 5.9 2.9h50.8c6.6 0 10.2-7.9 5.9-13.1zM880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32m-36 732H180V180h664z"
      ></path>
    </svg>
  ),
  финансы: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      className="h-full w-full text-white"
    >
      <path
        fill="currentColor"
        d="M2 28h28v2H2zm25-17a1 1 0 0 0 1-1V7a1 1 0 0 0-.66-.94l-11-4a1 1 0 0 0-.68 0l-11 4A1 1 0 0 0 4 7v3a1 1 0 0 0 1 1h1v13H4v2h24v-2h-2V11zM6 7.7l10-3.64L26 7.7V9H6zM18 24h-4V11h4zM8 11h4v13H8zm16 13h-4V11h4z"
      ></path>
    </svg>
  ),
  квартира: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="h-full w-full text-white"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M21 19v-6.733a4 4 0 0 0-1.245-2.9L13.378 3.31a2 2 0 0 0-2.755 0L4.245 9.367A4 4 0 0 0 3 12.267V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2"></path>
        <path d="M9 15a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6H9z"></path>
      </g>
    </svg>
  ),
};

// Иконка по умолчанию для неизвестных категорий
const defaultIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-full w-full text-white"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

// Объект для сопоставления категорий с цветом фона
const colorMapping = {
  задачи: "bg-green-500",
  правила: "bg-yellow-500",
  штрафы: "bg-red-500",
  затраты: "bg-purple-500",
  финансы: "bg-pink-500",
  квартира: "bg-teal-500",
};

const NotificationDetails = ({ notification, onBack }) => {
  const date = new Date(notification.datetime);
  let formattedDatetime = date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
  // Удаляем запятую и точки, чтобы получить формат "26 янв 23:45"
  formattedDatetime = formattedDatetime.replace(",", "").replace(/\./g, "");

  // Выбираем иконку и цвет фона в зависимости от категории
  const icon = iconMapping[notification.category.toLowerCase()] || defaultIcon;
  const bgColor =
    colorMapping[notification.category.toLowerCase()] || "bg-indigo-500";

  return (
    <div className="p-4">
      {/* Кнопка "Назад" отображается только на мобильных устройствах */}
      {onBack && (
        <button onClick={onBack} className="mb-4 text-gray-400 md:hidden">
          Назад
        </button>
      )}
      <div className="flex items-center gap-x-4">
        {/* Вместо изображения отображаем иконку в кружочке */}
        <div
          className={`h-12 w-12 flex-none rounded-full ${bgColor} flex items-center justify-center p-2`}
        >
          {icon}
        </div>
        <div className="text-lg font-bold">{notification.category}</div>
      </div>
      <div className="mt-4">
        <div className="text-sm text-gray-500">{notification.description}</div>
        <div className="mt-1 text-xs text-gray-500">
          <span className="font-semibold">Дата и время:</span>{" "}
          <time dateTime={notification.datetime}>{formattedDatetime}</time>
        </div>
      </div>
    </div>
  );
};

NotificationDetails.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    datetime: PropTypes.string.isRequired,
  }).isRequired,
  onBack: PropTypes.func,
};

export default NotificationDetails;
