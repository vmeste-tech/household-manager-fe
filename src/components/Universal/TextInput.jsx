import PropTypes from "prop-types";

const TextInput = ({ id, label, type, placeholder, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        {...props}
      />
    </div>
  </div>
);

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

export default TextInput;
