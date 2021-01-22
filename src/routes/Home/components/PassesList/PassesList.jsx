import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
	useFirestore,
	useFirestoreConnect,
	isLoaded,
	isEmpty
} from 'react-redux-firebase'
import { useDispatch, useSelector } from 'react-redux'
import { useNotifications } from 'modules/notification'
import LoadingSpinner from 'components/LoadingSpinner'
import { GYMS_COLLECTION, USERS_COLLECTION } from 'constants/firebasePaths'
import GymPassesTile from '../GymPassesTile'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { setPassesForUser, setUpdateResult, selectUserPasses } from '../../../../store/reducers/user'
// import NewProjectTile from '../NewProjectTile'
import AddGymDialog from '../AddGymDialog'
import styles from './PassesList.styles'
import ReplayIcon from '@material-ui/icons/Replay'
import SaveIcon from '@material-ui/icons/Save'
import ConfirmationDialog from '../ConfirmationDialog'
import { cloneDeep } from 'lodash'
import CircularProgress from '@material-ui/core/CircularProgress'
import { setShowUpdateResultDialog } from 'store/reducers/dialog'


const useStyles = makeStyles(styles)

function usePassesList() {
	const { showSuccess, showError } = useNotifications()
	const firestore = useFirestore()

	// Get auth from redux state
	const auth = useSelector(({ firebase: { auth } }) => auth)

	useFirestoreConnect([
		{
			collection: USERS_COLLECTION,
			doc: auth.uid
		},
		{
			collection: GYMS_COLLECTION
		}
	])

	// const data = useSelector(({ firestore: { data } }) => data)
	// console.log('DATA', data)

	// // Get user from redux state
	const users = useSelector(({ firestore: { data: { users } } }) => users)
	const gyms = useSelector(({ firestore: { data: { gyms } } }) => gyms)

	// // New dialog
	// const [newDialogOpen, changeDialogState] = useState(false)
	// const toggleDialog = () => changeDialogState(!newDialogOpen)

	// function addProject(newInstance) {
	//   if (!auth.uid) {
	//     return showError('You must be logged in to create a project')
	//   }
	//   return firestore
	//     .add(USERS_COLLECTION, {
	//       ...newInstance,
	//       createdBy: auth.uid,
	//       createdAt: firestore.FieldValue.serverTimestamp()
	//     })
	//     .then(() => {
	//       toggleDialog()
	//       showSuccess('Project added successfully')
	//     })
	//     .catch((err) => {
	//       console.error('Error:', err) // eslint-disable-line no-console
	//       showError(err.message || 'Could not add project')
	//       return Promise.reject(err)
	//     })
	// }

	// return { user, gyms }
	return { users, gyms, uid: auth.uid }
}

function PassesList() {
	const dispatch = useDispatch()
	const firestore = useFirestore()

	const [showLoading, setShowLoading] = useState(false)

	const classes = useStyles()
	const {
		uid,
		users,
		gyms
	} = usePassesList()

	useEffect(() => {
		firestore.collection(USERS_COLLECTION).doc(uid).get().then(user => {
			dispatch(setPassesForUser(user.data().passes))
		})
	}, [uid, dispatch, firestore])

	const editableUserPasses = useSelector(selectUserPasses)

	if (!isLoaded(users) || !isLoaded(gyms) || !users || !gyms || !editableUserPasses || !users[uid]) {
		return <LoadingSpinner />
	}

	const user = users[uid]
	const userPassesInFirestore = user.passes
	let counter = 0

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
	const passDifferences = calculatePassDifferences(userPassesInFirestore, editableUserPasses)

	const hasNoChanges = Object.keys(passDifferences).length === 0 || Object.values(passDifferences).every(v => v === 0)

	function resetUserPasses() {
		dispatch(setPassesForUser(userPassesInFirestore))
	}

	function submitChanges() {
		setShowLoading(true)

		const updatedUserPasses = cloneDeep(editableUserPasses)
		// Remove gyms with 0 passes
		Object.keys(updatedUserPasses).forEach(gym => {
			if (updatedUserPasses[gym] === 0) {
				delete updatedUserPasses[gym]
			}
		})

		firestore.collection(USERS_COLLECTION).doc(uid).update({
			passes: updatedUserPasses
		})
			.then(() => {
				dispatch(setPassesForUser(updatedUserPasses))
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

	return (
		<div className={classes.root}  >
			<Paper className={classes.paper} elevation={2}>
				<Typography variant="h6">{`${user.firstName} ${user.lastName}`}</Typography>
			</Paper>
			{
				!isEmpty(editableUserPasses) ?
					<List>
						{
							Object.keys(editableUserPasses).map((gymId) => {
								counter += 1
								const numberOfPasses = editableUserPasses[gymId]
								const numberOfPassesInFirestore = userPassesInFirestore[gymId] || 0
								return (
									<div key={`Gym-${gymId}`}>
										{/* {counter !== 1 ? <Divider variant="middle" /> : null} */}
										<GymPassesTile
											gymId={gymId}
											gymName={gyms[gymId] && gyms[gymId].name}
											gymLink={gyms[gymId] && (gyms[gymId].appUrl || gyms[gymId].url)}
											numberOfPasses={numberOfPasses}
											passDifference={passDifferences[gymId] || 0}
										/>
									</div>
								)
							})
						}
					</List>
					:
					<ListItem className={classes.noPasses}><b>No passes here yet. Try adding some!</b></ListItem>
			}
			<div className={classes.formActions}>
				{
					showLoading ?
						<CircularProgress />
						:
						<>
							<AddGymDialog gymsToAdd={getGymsToAdd()} />
							<br />
							<span>
								<Button
									variant="outlined"
									disabled={hasNoChanges}
									onClick={resetUserPasses}
								>
									Reset <ReplayIcon />
								</Button>
								&nbsp; &nbsp;
								<ConfirmationDialog isSubmitDisabled={hasNoChanges} passDifferences={passDifferences} onSubmit={submitChanges} />
							</span>
						</>
				}
			</div>
		</div>
	)

}

export default PassesList
