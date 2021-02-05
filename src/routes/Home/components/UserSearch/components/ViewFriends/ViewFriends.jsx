import { gql, useApolloClient } from '@apollo/client'
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
import Tooltip from '@material-ui/core/Tooltip'
import PeopleIcon from '@material-ui/icons/People'
import LoadingSpinner from 'components/LoadingSpinner'
import { useNotifications } from 'modules/notification'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import styles from './ViewFriends.styles'

const useStyles = makeStyles(styles)

function ViewFriends({ handleViewFriends, loggedInUser, userSearchList }) {
	const classes = useStyles()
	const apolloClient = useApolloClient()
	const { showError } = useNotifications()

	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)

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

	const [friendsInRedux, setFriendsInRedux] = useState(loggedInUser.friends)

	useEffect(() => {
		if (friendsInRedux.length > 0) {
			setLoading(true)
			apolloClient.query({
				query: gql`
					query GetUsers($identifiers: [String!], $identifierType: String!) { 
						users(identifiers: $identifiers, identifierType: $identifierType) {
							firstName
							lastName
							email
							uid
						}
					}`,
				variables: { identifiers: friendsInRedux, identifierType: "uid" }
			})
				.then(result => {
					const users = result.data.users
					const friendsToAdd = {}
					users.forEach(user => {
						friendsToAdd[user.uid] = {
							...user,
							isSelected: false
						}
					})
					setFriendsList(friendsList => ({
						...friendsList,
						...friendsToAdd
					}))
				})
				.catch(error => showError(error.message))
				.finally(() => setLoading(false))
		}
	}, [apolloClient, friendsInRedux, showError])

	// useEffect(() => {
	// 	const friendsToAdd = {}
	// 	friendsData && friendsData.users.forEach(friend => {
	// 		friendsToAdd[friend.uid] = {
	// 			...friend,
	// 			isSelected: false
	// 		}
	// 	})
	// 	setFriendsList(friendsList => ({
	// 		...friendsList,
	// 		...friendsToAdd
	// 	}))
	// }, [friendsData])

	// useEffect(() => {
	// 	if (friendsInRedux.length > 0) {
	// 		// firestore.collection(USERS_PUBLIC_COLLECTION).where(firebase.firestore.FieldPath.documentId(), 'in', friendsInRedux)
	// 		// 	.get()
	// 		// 	.then(results => {
	// 		// 		results.forEach(result => {
	// 		// 			const userPublicData = result.data()
	// 		// 			setFriendsList(friendsList => ({
	// 		// 				...friendsList,
	// 		// 				[userPublicData.uid]: {
	// 		// 					...userPublicData,
	// 		// 					isSelected: false
	// 		// 				}
	// 		// 			}))
	// 		// 		})
	// 		// 	})
	// 	}
	// }, [friendsInRedux, firebase.firestore.FieldPath, firestore, firebase])

	useEffect(() => {
		setFriendsList(friendsList => {
			// Add new friends using details from userSearchList
			const userSearchListValues = Object.values(userSearchList)
			loggedInUser.friends.filter(uid => !Object.keys(friendsList).includes(uid)).forEach(newFriendUid => {
				const newFriend = userSearchListValues.filter(user => user.uid === newFriendUid)[0]
				friendsList[newFriendUid] = {
					...newFriend,
					isSelected: true
				}
			})

			// Set correct state for all existing friends
			const uidsInSearchList = Object.keys(userSearchList)
			Object.keys(friendsList).forEach(uid => {
				const user = friendsList[uid]
				if (!loggedInUser.friends.includes(uid) && loggedInUser.uid !== uid) { // Friend was deleted
					delete friendsList[uid]
				} else if (uidsInSearchList.includes(user.uid)) { // Friend is in search list, so is selected
					friendsList[uid] = {
						...friendsList[uid],
						isSelected: true
					}
				} else { // Friend is not in search list, so is not selected
					friendsList[uid] = {
						...friendsList[uid],
						isSelected: false
					}
				}
			})
			return friendsList
		})
	}, [loggedInUser, userSearchList])

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

	return (
		<div>
			<Tooltip disableFocusListener arrow enterTouchDelay={5} title="View friends">
				<IconButton
					onClick={handleOpen}
					className={classes.iconButton}
					aria-label="View friends"
					data-test="view-friends-button"
				>
					<PeopleIcon />
				</IconButton>
			</Tooltip>
			<Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
				<DialogTitle>Select people to view</DialogTitle>
				{
					loading ?
						<LoadingSpinner />
						:
						<>
							<DialogContent>
								<FormControl component="fieldset" className={classes.formControl} data-test="select-friends-form">
									<FormGroup>
										{
											Object.keys(friendsList).length > 0 ?
												Object.keys(friendsList).map(uid => {
													const friend = friendsList[uid]
													if (friend.firstName !== undefined && friend.lastName !== undefined) {
														return (
															<FormControlLabel
																control={<Checkbox checked={friend.isSelected} onChange={handleChange} name={uid} data-test="select-friend-checkbox" />}
																label={`${friend.firstName} ${friend.lastName}` + (uid === loggedInUser.uid ? " (Me)" : "")} key={uid}
															/>
														)
													} else {
														return null
													}
												})
												:
												'No friends here yet. Try adding some!'
										}
									</FormGroup>
								</FormControl>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleSubmit} color="primary" data-test="view-friends-ok">
									Ok
         						</Button>
							</DialogActions>
						</>
				}
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
