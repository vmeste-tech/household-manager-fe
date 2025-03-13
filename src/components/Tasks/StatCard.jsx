import PropTypes from "prop-types";

export function StatCard({ title, value, changeText, isIncrease }) {
  // Иконка для увеличения (зелёная)
  const increaseIcon = (
    <svg
      className="w-4 h-4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
        clipRule="evenodd"
      />
    </svg>
  );

  // Иконка для уменьшения (красная)
  const decreaseIcon = (
    <svg
      className="w-4 h-4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
        clipRule="evenodd"
      />
    </svg>
  );

  const changeColor = isIncrease ? "text-green-600" : "text-red-600";
  const icon = isIncrease ? increaseIcon : decreaseIcon;

  return (
    <div className="relative p-6 rounded-2xl bg-white shadow">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500">
          <span>{title}</span>
        </div>
        <div className="text-3xl">{value}</div>
        <div
          className={`flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium ${changeColor}`}
        >
          <span>{changeText}</span>
          {icon}
        </div>
      </div>
    </div>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  changeText: PropTypes.string.isRequired,
  isIncrease: PropTypes.bool.isRequired,
};
