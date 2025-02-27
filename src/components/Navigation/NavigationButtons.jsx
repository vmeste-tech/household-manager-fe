import PropTypes from "prop-types";

const NavigationButtons = ({
  leftLabel,
  rightLabel,
  leftButtonClasses,
  rightButtonClasses,
  onLeftClick,
  onRightClick,
  leftIcon,
  rightIcon,
}) => {
  return (
    <div className="flex justify-between gap-2">
      <button
        onClick={onLeftClick}
        className={`inline-flex items-center ${leftButtonClasses}`}
      >
        {leftIcon}
        <span className="ml-1 font-bold text-lg">{leftLabel}</span>
      </button>
      <button
        onClick={onRightClick}
        className={`inline-flex items-center ${rightButtonClasses}`}
      >
        <span className="mr-1 font-bold text-lg">{rightLabel}</span>
        {rightIcon}
      </button>
    </div>
  );
};

NavigationButtons.propTypes = {
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  leftButtonClasses: PropTypes.string,
  rightButtonClasses: PropTypes.string,
  onLeftClick: PropTypes.func,
  onRightClick: PropTypes.func,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
};

NavigationButtons.defaultProps = {
  leftLabel: "Back",
  rightLabel: "Next",
  leftButtonClasses:
    "border border-indigo-300 px-3 py-1.5 rounded-md text-indigo-500 hover:bg-indigo-50",
  rightButtonClasses:
    "border border-indigo-300 px-3 py-1.5 rounded-md text-indigo-500 hover:bg-indigo-50",
  onLeftClick: () => {},
  onRightClick: () => {},
  leftIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 16l-4-4m0 0l4-4m-4 4h18"
      />
    </svg>
  ),
  rightIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  ),
};

export default NavigationButtons;
