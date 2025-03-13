import PropTypes from "prop-types";

const CustomButton = ({ text, onClick, variant = "filled" }) => {
  const baseClasses =
    "inline-block px-3 py-2 text-xs font-medium uppercase tracking-wider rounded-md cursor-pointer duration-150 ease-in-out";
  const filledClasses =
    "text-white bg-indigo-700 border border-indigo-700 hover:bg-indigo-800";
  const outlinedClasses =
    "text-indigo-600 border !border-indigo-600 hover:bg-indigo-50";

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${
        variant === "filled" ? filledClasses : outlinedClasses
      }`}
    >
      {text}
    </div>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["filled", "outlined"]),
};

export default CustomButton;
