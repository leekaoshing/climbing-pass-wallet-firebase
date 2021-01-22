import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { validateEmail } from 'utils/form'
import styles from './ResetPasswordForm.styles'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(styles)

function ResetPasswordForm({ onSubmit }) {
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
      <Typography variant="h6">Reset Password</Typography>
      <TextField
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="email"
        margin="normal"
        fullWidth
        inputRef={register({
          required: true,
          validate: validateEmail
        })}
        error={!!errors.email}
        helperText={errors.email && errors.email.message}
      />
      <div className={classes.submit}>
        <Button
          color="primary"
          type="submit"
          variant="contained"
          data-test="login-button"
          disabled={isSubmitting || !isValid}>
          {isSubmitting ? 'Loading' : 'Submit'}
        </Button>
      </div>
    </form>
  )
}

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default ResetPasswordForm
