import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	List,
	ListItem,
	ListItemText
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addGymToUser } from 'store/reducers/user'
import styles from './AddGymDialog.styles'

const useStyles = makeStyles(styles)

function AddGymDialog({ gymsToAdd }) {
	const classes = useStyles()
	const dispatch = useDispatch()

	const [showAddGymDialog, setShowAddGymDialog] = useState(false)

	function openAddGymDialog() {
		setShowAddGymDialog(true)
	}

	function closeAddGymDialog() {
		setShowAddGymDialog(false)
	}

	function handleSelect(gymId) {
		dispatch(addGymToUser(gymId))
		closeAddGymDialog()
	}

	function isButtonDisabled() {
		return Object.keys(gymsToAdd).length === 0
	}

	return (
		<>
			<Button variant="outlined" color="primary" onClick={openAddGymDialog} disabled={isButtonDisabled()}>
				Add gym
			</Button>
			<Dialog open={showAddGymDialog} onClose={closeAddGymDialog}>
				<DialogTitle id="add-gym-dialog-title">Add gym</DialogTitle>
				<DialogContent>
					<List>
						{	
							Object.keys(gymsToAdd).map(gymId => {
								return (
									<ListItem key={`add-gym-list-${gymId}`} button onClick={() => handleSelect(gymId)}>
										<ListItemText primary={gymsToAdd[gymId].name} />
									</ListItem>
								)
							})
						}
					</List>
				</DialogContent>
			</Dialog>
		</>
	)
}

AddGymDialog.propTypes = {
	gymsToAdd: PropTypes.object.isRequired
}

export default AddGymDialog
