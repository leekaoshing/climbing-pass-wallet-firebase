import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
	useFirestore,
	useFirestoreConnect,
	isLoaded,
	isEmpty,
	useFirebase
} from 'react-redux-firebase'
import { useDispatch, useSelector } from 'react-redux'
import { useNotifications } from 'modules/notification'
import LoadingSpinner from 'components/LoadingSpinner'
import { GYMS_COLLECTION, USERS_COLLECTION } from 'constants/firebasePaths'
import GymTile from '../GymTile'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { updateUserPassesInSearchList, setUpdateResult, removeUserFromSearchList } from '../../../../store/reducers/user'
// import NewProjectTile from '../NewProjectTile'
import AddGymDialog from '../AddGymDialog'
import styles from './PersonTile.styles'
import ReplayIcon from '@material-ui/icons/Replay'
import ConfirmationDialog from '../ConfirmationDialog'
import { cloneDeep } from 'lodash'
import CircularProgress from '@material-ui/core/CircularProgress'
import { setShowUpdateResultDialog } from 'store/reducers/dialog'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import PropTypes from 'prop-types'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled'


const useStyles = makeStyles(styles)

function PersonTile({ user, editable }) {
	const dispatch = useDispatch()
	const firebase = useFirebase()
	const firestore = useFirestore()

	const classes = useStyles()
	const gyms = useSelector(state => state.firestore.data.gyms)
	const auth = useSelector(state => state.firebase.auth)
	const loggedInUser = useSelector(state => state.firestore.data.users[auth.uid])

	function getGymsToAdd() {
		const gymsToAdd = {}
		const existingGyms = Object.keys(editableUserPasses)
		Object.keys(gyms).forEach(id => {
			if (!existingGyms.includes(id)) {
				gymsToAdd[id] = gyms[id]
			}
		})
		return gymsToAdd
	}

	function addGymToUser(gymId) {
		setEditableUserPasses({
			...editableUserPasses,
			[gymId]: 0
		})
	}

	function setPassesForGym(gymId, numberOfPasses) {
		setEditableUserPasses({
			...editableUserPasses,
			[gymId]: numberOfPasses
		})
	}

	function calculatePassDifferences(oldPasses, newPasses) {
		const differenceInPasses = {}
		Object.keys(newPasses).forEach(key => {
			const oldPassQuantity = oldPasses[key] === undefined ? 0 : oldPasses[key]
			const newPassQuantity = newPasses[key]
			const change = newPassQuantity - oldPassQuantity
			if (change !== 0) differenceInPasses[key] = newPassQuantity - oldPassQuantity
		})
		return differenceInPasses
	}


	function resetUserPasses() {
		setEditableUserPasses(user.passes)
	}

	function removeUser(user) {
		dispatch(removeUserFromSearchList(user.email))
	}

	function submitChanges() {
		if (firebase.auth().currentUser.email !== user.email) {
			return
		}

		setShowLoading(true)

		const updatedUserPasses = cloneDeep(editableUserPasses)
		// Remove gyms with 0 passes
		Object.keys(updatedUserPasses).forEach(gym => {
			if (updatedUserPasses[gym] === 0) {
				delete updatedUserPasses[gym]
			}
		})

		firestore.collection(USERS_COLLECTION).doc(auth.uid).update({
			passes: updatedUserPasses
		})
			.then(() => {
				dispatch(updateUserPassesInSearchList({
					...user,
					passes: updatedUserPasses
				}))
				dispatch(setUpdateResult(
					{
						success: true,
						message: 'Successfully updated!'
					}
				))
			})
			.catch(error => {
				dispatch(setUpdateResult(
					{
						success: false,
						message: error.message
					}
				))
			})
			.finally(() => {
				setShowLoading(false)
				dispatch(setShowUpdateResultDialog(true))
			})
	}

	function addFriend() {
		firestore.collection(USERS_COLLECTION).doc(auth.uid).update({
			friends: [
				...loggedInUser.friends,
				user.email
			]
		}) // TODO Catch error
	}

	function removeFriend() {
		const friends = cloneDeep(loggedInUser.friends)
		friends.splice(friends.indexOf(user.email), 1)
		firestore.collection(USERS_COLLECTION).doc(auth.uid).update({
			friends
		}) // TODO Catch error
	}

	const [showLoading, setShowLoading] = useState(false)
	const [editableUserPasses, setEditableUserPasses] = useState(cloneDeep(user.passes))

	const passDifferences = calculatePassDifferences(user.passes, editableUserPasses)
	const hasNoChanges = Object.keys(passDifferences).length === 0 || Object.values(passDifferences).every(v => v === 0)
	const isSelf = user.email === auth.email
	const areYouTheirFriend = isSelf || user.friends.includes(auth.email)
	const areTheyYourFriend = loggedInUser.friends.includes(user.email)

	let counter = 0

	return (
		<div className={classes.root}  >
			<Card className={classes.card}>

				{
					areYouTheirFriend ?
						<>
							<CardHeader disableTypography title={
								<Typography variant="h6" data-test="user-name-card">{`${user.firstName} ${user.lastName}`}</Typography>
							} className={classes.name} />

							<CardContent className={classes.content}>
								{
									!isEmpty(editableUserPasses) ?
										<List>
											{
												Object.keys(editableUserPasses).sort().map((gymId) => {
													counter += 1
													const numberOfPasses = editableUserPasses[gymId]
													return (
														<div key={`Gym-${gymId}`}>
															{counter !== 1 ? <Divider variant="middle" /> : null}
															<GymTile
																gymId={gymId}
																gymName={gyms[gymId] && gyms[gymId].name}
																gymLink={gyms[gymId] && (gyms[gymId].appUrl || gyms[gymId].url)}
																numberOfPasses={numberOfPasses}
																passDifference={passDifferences[gymId] || 0}
																editable={editable}
																setPassesFunction={setPassesForGym}
															/>
														</div>
													)
												})
											}
										</List>
										:
										<ListItem className={classes.noPasses}><b>{editable ? 'No passes here yet. Try adding some!' : 'No passes here yet. Ask them to add some!'}</b></ListItem>
								}
								{
									editable ?
										<div className={classes.formActions}>
											{
												showLoading ?
													<CircularProgress />
													:
													<>
														<AddGymDialog gymsToAdd={getGymsToAdd()} addGymFunction={addGymToUser} />
														<Button
															variant="outlined"
															disabled={hasNoChanges}
															onClick={resetUserPasses}
															className={classes.buttons}
														>
															Reset <ReplayIcon />
														</Button>
														<ConfirmationDialog isSubmitDisabled={hasNoChanges} passDifferences={passDifferences} onSubmit={submitChanges} />
													</>
											}
										</div>
										: null
								}
							</CardContent>
						</>
						:
						<>
							<CardHeader disableTypography title={
								<Typography variant="subtitle2" data-test="user-email-card">{user.email}</Typography>
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
									<PersonAddDisabledIcon fontSize="small"/>
								</IconButton>
								:
								<IconButton size="small" onClick={addFriend}>
									<PersonAddIcon fontSize="small"/>
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