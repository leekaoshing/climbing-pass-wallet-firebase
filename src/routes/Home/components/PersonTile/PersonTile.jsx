import {
	Button, Dialog,
	DialogActions,
	DialogContent,
	IconButton
} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CancelIcon from '@material-ui/icons/Cancel'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled'
import { FRIENDS_COLLECTION, USERS_COLLECTION } from 'constants/firebasePaths'
import { cloneDeep } from 'lodash'
import { useNotifications } from 'modules/notification'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	useFirebase,
	useFirestore
} from 'react-redux-firebase'
import { removeUserFromSearchList } from '../../../../store/reducers/user'
import PersonDetails from '../PersonDetails'
import styles from './PersonTile.styles'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles(styles)

function PersonTile({ user, editable }) {
	const dispatch = useDispatch()
	const firebase = useFirebase()
	const firestore = useFirestore()
	const { showError, showSuccess } = useNotifications()

	const [showRemoveFriendDialog, setShowRemoveFriendDialog] = useState(false)

	const classes = useStyles()
	const auth = useSelector(state => state.firebase.auth)
	const loggedInUser = useSelector(state => state.firestore.data.users[auth.uid])

	function removeUser(user) {
		dispatch(removeUserFromSearchList(user.uid))
	}

	function addFriend() {
		Promise.all([
			firestore.collection(USERS_COLLECTION).doc(auth.uid).update({
				friends: [
					...loggedInUser.friends,
					user.uid
				]
			}),
			
			// Preemptive code implementing a new collection where { from: ..., to: ... } friend relations are stored
			firestore.collection(FRIENDS_COLLECTION).add({
				from: auth.uid,
				to: user.uid,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				active: true
			})
		])
			.then(() => showSuccess(`Successfully added ${user.firstName} ${user.lastName} to friend list.`))
			.catch(error => showError(error.message))
	}

	function removeFriend() {
		const friends = cloneDeep(loggedInUser.friends)
		friends.splice(friends.indexOf(user.uid), 1)
		Promise.all([
			firestore.collection(USERS_COLLECTION).doc(auth.uid).update({
				friends
			}),

			// Preemptive code implementing a new collection where { from: ..., to: ... } friend relations are stored
			firestore.collection(FRIENDS_COLLECTION)
				.where('from', '==', auth.uid)
				.where('to', '==', user.uid)
				.where('active', '==', true)
				.get()
				.then(querySnapshot => {
					querySnapshot.forEach(doc => {
						doc.ref.update({
							active: false,
							inactiveAt: firebase.firestore.FieldValue.serverTimestamp(),
						})
					})
				})
		])
			.then(() => {
				showSuccess(`Successfully removed ${user.firstName} ${user.lastName} from friend list.`)
				handleCloseRemoveFriendDialog()
			})
			.catch(error => showError(error.message))
	}


	const [isSelf, setIsSelf] = useState(false)
	useEffect(() => {
		setIsSelf(user.uid === auth.uid)
	}, [user, auth])

	const [isViewable, setIsViewable] = useState(false)
	useEffect(() => {
		setIsViewable(isSelf || user.canView)
	}, [isSelf, user])

	const [areTheyYourFriend, setAreTheyYourFriend] = useState(false)
	useEffect(() => {
		setAreTheyYourFriend(loggedInUser.friends.includes(user.uid))
	}, [loggedInUser, user])

	const [fullName, setFullName] = useState('')
	useEffect(() => {
		setFullName(`${user.firstName} ${user.lastName}`)
	}, [user])

	function handleOpenRemoveFriendDialog() {
		setShowRemoveFriendDialog(true)
	}

	function handleCloseRemoveFriendDialog() {
		setShowRemoveFriendDialog(false)
	}

	const removeFriendsConfirmationDialog = (
		<Dialog open={showRemoveFriendDialog} onClose={handleCloseRemoveFriendDialog}>
			<DialogContent>Remove {fullName} from friend list?</DialogContent>
			<DialogActions>
				<Button onClick={handleCloseRemoveFriendDialog} data-test="close-remove-friends-dialog">No</Button>
				<Button onClick={removeFriend} data-test="remove-friend-confirmation-button">Yes</Button>
			</DialogActions>
		</Dialog>
	)

	return (
		<div className={classes.root}  >
			{removeFriendsConfirmationDialog}
			<Card className={classes.card}>
				{
					isViewable ?
						<PersonDetails user={user} editable={editable} />
						:
						<>
							<CardHeader disableTypography title={
								<Typography variant="h6" data-test="user-name-card">{fullName}</Typography>
							} className={classes.name} />
							<CardContent className={classes.cardContent}>
								<p className={classes.textContent} data-test="not-friend">This person has not added you as a friend yet. Ask them to add you to view their passes.</p>
							</CardContent>
						</>

				}

				<div className={classes.filler}></div>
				<CardActions className={classes.cardActions}>
					{
						isSelf ? null
							:
							areTheyYourFriend ?
								<Tooltip disableFocusListener arrow enterTouchDelay={5} title="Remove friend">
									<IconButton size="small" onClick={handleOpenRemoveFriendDialog} aria-label="Remove person as friend" data-test="remove-friend-button">
										<PersonAddDisabledIcon fontSize="small" />
									</IconButton>
								</Tooltip>
								:
								<Tooltip disableFocusListener arrow enterTouchDelay={5} title="Add friend" aria-label="Add person as friend" data-test="add-friend-button">
									<IconButton size="small" onClick={addFriend}>
										<PersonAddIcon color="primary" fontSize="small" />
									</IconButton>
								</Tooltip>
					}

					<div className={classes.filler}></div>
					<Tooltip disableFocusListener arrow enterTouchDelay={5} title="Remove person">
						<IconButton size="small"
							onClick={() => removeUser(user)}
							aria-label="Remove person from search list"
							data-test="remove-user-button"
						>
							<CancelIcon fontSize="small" />
						</IconButton>
					</Tooltip>
				</CardActions>
			</Card>
		</div>
	)
}

PersonTile.propTypes = {
	user: PropTypes.object.isRequired,
	editable: PropTypes.bool.isRequired
}

export default PersonTile