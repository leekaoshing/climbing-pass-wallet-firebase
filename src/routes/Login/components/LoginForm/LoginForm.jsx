import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { validateEmail } from 'utils/form'
import styles from './LoginForm.styles'
import { useHistory } from 'react-router-dom'
import { RESET_PATH } from 'constants/paths'

const useStyles = makeStyles(styles)

function LoginForm({ onSubmit }) {
  const classes = useStyles()
  const history = useHistory()
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting, isValid }
  } = useForm({
    mode: 'onChange',
    nativeValidation: false
  })

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6">Log In</Typography>
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
        helperText={errors.email && errors.email.message}
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
          required: true
        })}
        error={!!errors.password}
        helperText={errors.password && errors.password.message}
      />
      <div className={classes.submit}>
        <Button
          color="primary"
          type="submit"
          variant="contained"
          data-test="login-button"
          disabled={isSubmitting || !isValid}>
          {isSubmitting ? 'Loading' : 'Log In'}
        </Button>
        <br/>
        <Button
          type="submit"
          variant="outlined"
          onClick={() => history.push(RESET_PATH)}
          data-test="reset-password-button">
          Forgot Password?
        </Button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default LoginForm
