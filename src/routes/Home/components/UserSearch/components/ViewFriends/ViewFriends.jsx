import {
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import { makeStyles } from '@material-ui/core/styles'
import PeopleIcon from '@material-ui/icons/People'
import { USERS_PUBLIC_COLLECTION } from 'constants/firebasePaths'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import {
	useFirebase, useFirestore
} from 'react-redux-firebase'
import styles from './ViewFriends.styles'

const useStyles = makeStyles(styles)

function ViewFriends({ handleViewFriends, loggedInUser, userSearchList }) {
	const classes = useStyles()
	const firestore = useFirestore()
	const firebase = useFirebase()

	const [open, setOpen] = useState(false)

	const [friendsList, setFriendsList] = useState({})

	useEffect(() => {
		setFriendsList(friendsList => ({
			...friendsList,
			[loggedInUser.uid]: {
				...loggedInUser,
				isSelected: true
			}
		}))
	}, [loggedInUser])

	useEffect(() => {
		if (loggedInUser.friends.length > 0) {
			firestore.collection(USERS_PUBLIC_COLLECTION).where(firebase.firestore.FieldPath.documentId(), 'in', loggedInUser.friends)
				.get()
				.then(results => {
					results.forEach(result => {
						const userPublicData = result.data()

						setFriendsList(friendsList => ({
							...friendsList,
							[userPublicData.uid]: {
								...userPublicData,
								isSelected: false
							}
						}))
					})
				})
		}
	}, [loggedInUser, firebase.firestore.FieldPath, firestore])

	useEffect(() => {
		setFriendsList(friendsList => {
			Object.keys(friendsList).forEach(uid => {
				const user = friendsList[uid]
				if (userSearchList[user.email] !== undefined) {
					friendsList = {
						...friendsList,
						[uid]: {
							...user,
							isSelected: true
						}
					}
				} else {
					friendsList = {
						...friendsList,
						[uid]: {
							...user,
							isSelected: false
						}
					}
				}
			})
			return friendsList
		})
	}, [userSearchList])

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
		handleViewFriends(friendsList)
	}

	function handleClose() {
		setOpen(false)
	}

	function handleOpen() {
		setOpen(true)
	}

	const [friendUids, setFriendUids] = useState([])
	useEffect(() => {
		setFriendUids(Object.keys(friendsList))
	}, [friendsList])

	return (
		<div>
			<IconButton
				onClick={handleOpen}
				className={classes.iconButton}
			>
				<PeopleIcon />
			</IconButton>
			<Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
				<DialogTitle>Select people to view</DialogTitle>
				<DialogContent>
					<FormControl component="fieldset" className={classes.formControl}>
						<FormGroup>
							{
								friendUids.length > 0 ?
									friendUids.map(uid => {
										const friend = friendsList[uid]
										return (
											<FormControlLabel
												control={<Checkbox checked={friend.isSelected} onChange={handleChange} name={uid} />}
												label={`${friend.firstName} ${friend.lastName}` + (uid === loggedInUser.uid ? " (Me)" : "")} key={uid}
											/>
										)
									})
									:
									'No friends here yet. Try adding some!'
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
	userSearchList: PropTypes.object.isRequired
}

export default ViewFriends
