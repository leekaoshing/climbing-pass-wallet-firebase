import {
	Avatar,
	IconButton,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styles from './ConfirmationDialog.styles'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles(styles)

function ConfirmationDialog({ isSubmitDisabled, passDifferences, onSubmit }) {
	const classes = useStyles()

	const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)

	function openConfirmationDialog() {
		setShowConfirmationDialog(true)
	}

	function closeConfirmationDialog() {
		setShowConfirmationDialog(false)
	}

	function handleSubmit() {
		onSubmit()
		closeConfirmationDialog()
	}

	function getPassDifferenceString(value) {
		if (value < 0) {
			return value
		} else {
			return "+" + value
		}
	}

	return (
		<>
			<Tooltip disableFocusListener arrow enterTouchDelay={5} title="Save changes">
				<span>
					<IconButton color="primary" onClick={openConfirmationDialog} disabled={isSubmitDisabled} className={classes.button}>
						<SaveIcon />
					</IconButton>
				</span>
			</Tooltip>
			<Dialog open={showConfirmationDialog} onClose={closeConfirmationDialog}>
				<DialogTitle id="confirmation-dialog-title">Confirm changes</DialogTitle>
				<DialogContent>
					<List>
						{
							Object.keys(passDifferences).map(gymId => {
								return (
									<ListItem key={`confirmation-list-${gymId}`}>
										<ListItemAvatar>
											<Avatar className={classes.avatar}>
												{gymId}
											</Avatar>
										</ListItemAvatar>
										<ListItemText primary={getPassDifferenceString(passDifferences[gymId])} />
									</ListItem>
								)
							})
						}
					</List>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={closeConfirmationDialog}
					>
						No
					</Button>
					<Button
						color="primary"
						onClick={handleSubmit}
					>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

ConfirmationDialog.propTypes = {
	isSubmitDisabled: PropTypes.bool.isRequired,
	passDifferences: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired
}

export default ConfirmationDialog
