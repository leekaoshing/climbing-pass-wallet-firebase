import {
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Input
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import PeopleIcon from '@material-ui/icons/People'
import React, { useEffect, useState } from 'react'
import styles from './ViewFriends.styles'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import PropTypes from 'prop-types'
import {
	useFirebase, useFirestore
} from 'react-redux-firebase'
import { USERS_COLLECTION, USERS_PUBLIC_COLLECTION } from 'constants/firebasePaths'
import { cloneDeep } from 'lodash'

const useStyles = makeStyles(styles)

function ViewFriends({ handleViewFriends, loggedInUser }) {
	const classes = useStyles()
	const firestore = useFirestore()
	const firebase = useFirebase()

	const [open, setOpen] = useState(false)

	const [friendsList, setFriendsList] = useState({})

	useEffect(() => {
		if (loggedInUser.friends.length > 0) {
			firestore.collection(USERS_PUBLIC_COLLECTION).where(firebase.firestore.FieldPath.documentId(), 'in', loggedInUser.friends)
				.get()
				.then(results => {
					results.forEach(result => {
						const userPublicData = result.data()

						setFriendsList(friendsList => {
							return {
								...friendsList,
								[userPublicData.uid]: {
									...userPublicData,
									isSelected: false
								}
							}
						})
					})
				})
		}
	}, [loggedInUser, firebase.firestore.FieldPath, firestore])

	function handleChange(event) {
		const uid = event.target.name
		const friend = friendsList[uid]
		setFriendsList({
			...friendsList,
			[uid]: {
				...friend,
				isSelected: event.target.checked
			}
		})
	}

	function handleSubmit() {
		handleClose()
		const selectedFriends = []
		Object.keys(friendsList).forEach(uid => {
			const friend = cloneDeep(friendsList[uid])
			if (friendsList[uid].isSelected) {
				delete friend.isSelected
				selectedFriends.push(friend)
			}
		})
		handleViewFriends(selectedFriends)
	}

	function handleClose() {
		setOpen(false)
	}

	function handleOpen() {
		setOpen(true)
	}

	return (
		<div>
			<IconButton
				onClick={handleOpen}
				className={classes.iconButton}
			>
				<PeopleIcon />
			</IconButton>
			<Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
				<DialogTitle>Select friends to view</DialogTitle>
				<DialogContent>
					<FormControl component="fieldset" className={classes.formControl}>
						{/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
						<FormGroup>
							{
								Object.keys(friendsList).map(uid => {
									const friend = friendsList[uid]
									return (
										<FormControlLabel
											control={<Checkbox checked={friend.isSelected} onChange={handleChange} name={uid} />}
											label={`${friend.firstName} ${friend.lastName}`} key={uid}
										/>
									)
								})
							}
						</FormGroup>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
          			</Button>
					<Button onClick={handleSubmit} color="primary">
						Ok
         			</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

ViewFriends.propTypes = {
	handleViewFriends: PropTypes.func.isRequired,
	loggedInUser: PropTypes.object.isRequired,
}

export default ViewFriends
