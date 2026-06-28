import { useId } from 'react'

/**
 * Input component
 * @param {string} [label] - Visible label text, also used for accessible association
 * @param {string} [placeholder] - Placeholder text shown inside the field
 * @param {string} value - Current input value (controlled)
 * @param {Function} onChange - Change handler, receives the native change event
 * @param {string} [type="text"] - Input type (text, email, password, etc.)
 * @param {string} [name] - Form field name
 * @param {boolean} [disabled=false] - Whether the field is disabled
 * @param {string} [error] - Optional error message shown below the field
 * @param {string} [className] - Extra classes appended to the wrapper
 */
function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  name,
  disabled = false,
  error,
  className = '',
}) {
  const generatedId = useId()
  const inputId = name ?? generatedId

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`w-full rounded-lg border px-3 py-2 text-sm sm:text-base bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-forest-500 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:border-gray-600 ${
          error ? 'border-red-400' : 'border-gray-200'
        }`}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

export default Input
