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
      <div className="relative h-full bg-white rounded-2xl p-8 text-center w-full z-0 overflow-hidden hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col justify-between">
        <div>
          <h3 className="plan-title text-xl text-gray-800">{title}</h3>
          <span className="plan-title text-xs relative -top-2 m-0 text-gray-600">
            {subtitle}
          </span>
          <p className="plan-price text-3xl my-2 font-extrabold text-indigo-500">
            {fine}₽
          </p>
          <p className="text-gray-800 mt-4 text-balance">{description}</p>
        </div>

        {/* SVG для декоративного эффекта */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={svgClass}
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
