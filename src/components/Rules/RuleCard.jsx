import PropTypes from "prop-types";

const RuleCard = ({
  gradientClass,
  title,
  subtitle,
  fine,
  description,
  svgClass,
  svgPath,
  svgViewBox = "0 0 24 24",
}) => {
  return (
    <div
      className={`pricing-wrapper w-full relative rounded-2xl bg-gradient-to-t ${gradientClass} p-0.5 shadow-[0_0px_25px_0px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out hover:shadow-[0_0px_25px_0px_rgba(0,0,0,0.2)]`}
    >
      {/* Родительский контейнер без p-8 */}
      <div className="relative h-full bg-white rounded-2xl w-full z-0 overflow-hidden hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col">
        {/* Блок с отступами (для заголовка, описания и т.д.) */}
        <div className="p-4 text-center flex-1">
          <h3 className="plan-title text-xl text-gray-800">{title}</h3>
          <span className="plan-title text-xs relative -top-2 m-0 text-gray-600">
            {subtitle}
          </span>
          <p className="plan-price text-3xl my-2 font-extrabold text-indigo-500">
            {fine}₽
          </p>
          <p className="text-gray-800 mt-4 text-balance">{description}</p>
        </div>

        {/* Если subtitle равен "на голосовании", отображаем кнопки без p-8 */}
        {subtitle === "на голосовании" && (
          <div className="w-full border-t border-gray-200 flex">
            <button className="w-1/2 bg-transparent border-none text-indigo-500 py-3 hover:text-indigo-700 transition-colors">
              Принять
            </button>
            <button className="w-1/2 bg-transparent border-l border-gray-200 text-indigo-500 py-3 hover:text-indigo-700 transition-colors">
              Отклонить
            </button>
          </div>
        )}

        {/* Декоративный SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${svgClass} absolute bottom-2 right-2 opacity-10`}
          width="1em"
          height="1em"
          viewBox={svgViewBox}
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d={svgPath}
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

RuleCard.propTypes = {
  gradientClass: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired, // "на голосовании", "принято", "отклонено"
  fine: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string.isRequired,
  svgClass: PropTypes.string.isRequired,
  svgPath: PropTypes.string.isRequired,
  svgViewBox: PropTypes.string,
};

export default RuleCard;
