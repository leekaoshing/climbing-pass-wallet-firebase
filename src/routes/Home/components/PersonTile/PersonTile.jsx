import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CancelIcon from '@material-ui/icons/Cancel'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled'
import { USERS_COLLECTION } from 'constants/firebasePaths'
import { cloneDeep } from 'lodash'
import { useNotifications } from 'modules/notification'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	useFirestore
} from 'react-redux-firebase'
import { removeUserFromSearchList } from '../../../../store/reducers/user'
import PersonDetails from '../PersonDetails'
import styles from './PersonTile.styles'


const useStyles = makeStyles(styles)

function PersonTile({ user, editable }) {
	const dispatch = useDispatch()
	const firestore = useFirestore()
	const { showError } = useNotifications()

	const classes = useStyles()
	const auth = useSelector(state => state.firebase.auth)
	const loggedInUser = useSelector(state => state.firestore.data.users[auth.uid])

	function removeUser(user) {
		dispatch(removeUserFromSearchList(user.email))
	}

	function addFriend() {
		firestore.collection(USERS_COLLECTION).doc(auth.uid).update({
			friends: [
				...loggedInUser.friends,
				user.uid
			]
		}).catch(error => showError(error.message))
	}

	function removeFriend() {
		const friends = cloneDeep(loggedInUser.friends)
		friends.splice(friends.indexOf(user.uid), 1)
		firestore.collection(USERS_COLLECTION).doc(auth.uid).update({
			friends
		}).catch(error => showError(error.message))
	}

	const isSelf = user.uid === auth.uid
	const areYouTheirFriend = isSelf || user.isFriend
	const areTheyYourFriend = loggedInUser.friends.includes(user.uid)

	return (
		<div className={classes.root}  >
			<Card className={classes.card}>
				{
					areYouTheirFriend ?
						<PersonDetails user={user} editable={editable} />
						:
						<>
							<CardHeader disableTypography title={
								// <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: '11rem' }}>
									<Typography variant="subtitle2" data-test="user-email-card">{user.email}</Typography>
								// </div>
							} className={classes.email} />
							<CardContent className={classes.textContent}>
								<p>This user has not added you as a friend yet.</p>
							</CardContent>
						</>

				}

				<div className={classes.filler}></div>
				<CardActions className={classes.cardActions}>
					{
						isSelf ? null
							:
							areTheyYourFriend ?
								<IconButton size="small" onClick={removeFriend}>
									<PersonAddDisabledIcon fontSize="small" />
								</IconButton>
								:
								<IconButton size="small" onClick={addFriend}>
									<PersonAddIcon color="primary" fontSize="small" />
								</IconButton>
					}

					<div className={classes.filler}></div>
					<IconButton size="small"
						onClick={() => removeUser(user)}
					>
						<CancelIcon fontSize="small" />
					</IconButton>
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