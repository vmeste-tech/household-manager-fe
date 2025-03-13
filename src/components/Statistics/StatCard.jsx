import PropTypes from "prop-types";

// Переиспользуемый компонент для отображения статистики
const StatCard = ({ title, value, change, isIncrease = true }) => {
  return (
    <div className="p-6 bg-white shadow rounded-2xl">
      <dl className="space-y-2">
        <dt className="text-sm font-medium text-gray-500">{title}</dt>
        <dd className="text-5xl font-light md:text-6xl">{value}</dd>
        <dd
          className={`flex items-center space-x-1 text-sm font-medium ${
            isIncrease ? "text-green-500" : "text-red-500"
          }`}
        >
          <span>{change}</span>
          {isIncrease ? (
            <svg
              className="w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17.25 15.25V6.75H8.75"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17 7L6.75 17.25"
              />
            </svg>
          ) : (
            <svg
              className="w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17.25 8.75V17.25H8.75"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17 17L6.75 6.75"
              />
            </svg>
          )}
        </dd>
      </dl>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  isIncrease: PropTypes.bool,
};

export default StatCard;
