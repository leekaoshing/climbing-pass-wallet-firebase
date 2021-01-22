import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { validateEmail, validateName, validatePassword } from 'utils/form'
import styles from './SignupForm.styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(styles)

function SignupForm({ onSubmit }) {
  const classes = useStyles()
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting, isValid },
    watch
  } = useForm({
    mode: 'onChange',
    nativeValidation: false
  })
  const password = useRef({})
  password.current = watch("password", "")

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6">User Registration</Typography>
      <TextField
        name="firstName"
        placeholder="First Name"
        autoComplete="firstName"
        margin="normal"
        data-test="first-name-field"
        fullWidth
        inputRef={register({
          required: true,
          validate: validateName
        })}
        error={!!errors.firstName}
        helperText={errors.firstName && errors.firstName.message }
      />
      <TextField
        name="lastName"
        placeholder="Last Name"
        autoComplete="lastName"
        margin="normal"
        data-test="last-name-field"
        fullWidth
        inputRef={register({
          required: true,
          validate: validateName
        })}
        error={!!errors.lastName}
        helperText={errors.lastName && errors.lastName.message }
      />
      <TextField
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="email"
        margin="normal"
        data-test="email-field"
        fullWidth
        inputRef={register({
          required: true,
          validate: validateEmail
        })}
        error={!!errors.email}
        helperText={errors.email && errors.email.message }
      />
      <TextField
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        margin="normal"
        data-test="password-field"
        fullWidth
        inputRef={register({
          required: true,
          validate: validatePassword
        })}
        error={!!errors.password}
        helperText={errors.password && errors.password.message }
      />
      <TextField
        type="password"
        name="passwordConfirmation"
        placeholder="Confirm Password"
        autoComplete="current-password-confirmation"
        margin="normal"
        data-test="password-confirmation-field"
        fullWidth
        inputRef={register({
          required: true,
          validate: value =>
            value === password.current || "Passwords do not match."
        })}
        error={!!errors.passwordConfirmation}
        helperText={errors.passwordConfirmation && errors.passwordConfirmation.message }
      />
      <div className={classes.submit}>
        <Button
          color="primary"
          type="submit"
          variant="contained"
          data-test="sign-up-button"
          disabled={isSubmitting || !isValid}>
          {isSubmitting ? 'Loading' : 'Sign Up'}
        </Button>
      </div>
    </form>
  )
}

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default SignupForm
