import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { useNotifications } from 'modules/notification'
import React from 'react'
import { useFirebase } from 'react-redux-firebase'
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
		</div>
	)
}
export default ResetPasswordPage
