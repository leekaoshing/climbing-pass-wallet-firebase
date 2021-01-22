/**
 * Returns error message if value is not a valid email, otherwise returns
 * undefined
 * @param {string} value - Email to validate
 * @returns {string|undefined} Required string if value is undefined
 * @example <caption>Basic</caption>
 * <Field
 *   name="email"
 *   component={TextField}
 *   label="Email"
 *   validate={validateEmail}
 * />
 */
export function validateEmail(value) {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i.test(value)
    ? 'Invalid email address.'
    : undefined
}

export function validateName(value) {
  return value && !/^[a-zA-Z ]+$/i.test(value)
    ? 'Alphabets only.'
    : undefined
}

export function validatePassword(value) {
  return value && value.length < 6
    ? 'At least 6 characters.'
    : undefined
}
