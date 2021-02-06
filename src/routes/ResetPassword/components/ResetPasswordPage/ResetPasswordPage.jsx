import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { LOGIN_PATH } from 'constants/paths'
import { useNotifications } from 'modules/notification'
import React from 'react'
import { useFirebase } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import ResetPasswordForm from '../ResetPasswordForm'
import styles from './ResetPasswordPage.styles'

const useStyles = makeStyles(styles)

function ResetPasswordPage() {
	const classes = useStyles()
	const firebase = useFirebase()
	const { showError, showSuccess } = useNotifications()

	function resetPassword(form) {
		firebase.auth()
			.sendPasswordResetEmail(form.email)
			.then(() => {
				showSuccess('Email has been sent! Please also check your junk folder.')
			})
			.catch(error => {
				showError(error.message)
			})
	}

	return (
		<div className={classes.root}>
			<Paper className={classes.panel}>
				<ResetPasswordForm onSubmit={resetPassword} />
			</Paper>
			<Link className={classes.loginLink} to={LOGIN_PATH} data-test="login">
				Back to Login
      		</Link>
		</div>
	)
}
export default ResetPasswordPage
