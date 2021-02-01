import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectShowUpdateResultDialog, setShowUpdateResultDialog } from 'store/reducers/dialog'
import { selectUpdateResult } from 'store/reducers/user'
import styles from './UpdateResultDialog.styles'

const useStyles = makeStyles(styles)

function UpdateResultDialog() {
	const classes = useStyles()
	const dispatch = useDispatch()

	const showUpdateResultDialog = useSelector(selectShowUpdateResultDialog)
	const updateResult = useSelector(selectUpdateResult)

	function closeUpdateResultDialog() {
		dispatch(setShowUpdateResultDialog(false))
	}

	return (
		<Dialog open={showUpdateResultDialog} onClose={closeUpdateResultDialog}>
			<div className={classes.root}>
				<DialogContent>
					{
						updateResult ?
							<Typography className={classes.text} color={updateResult.success ? 'inherit' : 'error'} data-test="update-results-message">
								{updateResult.message}
							</Typography>
							:
							null
					}
				</DialogContent>
			</div>
			<DialogActions>
				<Button
					onClick={closeUpdateResultDialog}
				>
					Close
					</Button>
			</DialogActions>

		</Dialog>
	)
}

export default UpdateResultDialog
