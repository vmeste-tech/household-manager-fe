import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const FormInput = ({
  id,
  name,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  required = false,
  autoComplete,
  validations = {},
  className = '',
}) => {
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const validate = (val) => {
    if (required && !val) {
      return 'Это поле обязательно для заполнения';
    }

    if (val) {
      // Email validation
      if (type === 'email' && validations.email !== false) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
          return 'Пожалуйста, введите корректный email';
        }
      }

      // Password validation
      if (type === 'password' && validations.password !== false) {
        if (validations.minLength && val.length < validations.minLength) {
          return `Пароль должен содержать не менее ${validations.minLength} символов`;
        }
      }

      // Custom validation function
      if (validations.custom && typeof validations.custom === 'function') {
        const customError = validations.custom(val);
        if (customError) return customError;
      }
    }

    return '';
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    if (touched) {
      setError(validate(newValue));
    }
    
    if (onChange) {
      onChange(e);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validate(inputValue));
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          className={`appearance-none rounded-md block w-full px-3 py-2 border ${
            error ? 'border-red-300' : 'border-gray-300'
          } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
        />
      </div>
      {error && touched && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
  validations: PropTypes.object,
  className: PropTypes.string
};

export default FormInput;
