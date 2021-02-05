import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ReplayIcon from '@material-ui/icons/Replay'
import { GYMS_DOCUMENT_SINGAPORE, USERS_COLLECTION } from 'constants/firebasePaths'
import { cloneDeep } from 'lodash'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	isEmpty,
	useFirebase, useFirestore
} from 'react-redux-firebase'
import { setShowUpdateResultDialog } from 'store/reducers/dialog'
import { setUpdateResult, updateUserPassesInSearchList } from '../../../../store/reducers/user'
import AddGymDialog from '../AddGymDialog'
import ConfirmationDialog from '../ConfirmationDialog'
import GymTile from '../GymTile'
import styles from './PersonDetails.styles'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles(styles)

function PersonDetails({ user, editable }) {
	const dispatch = useDispatch()
	const firebase = useFirebase()
	const firestore = useFirestore()

	const classes = useStyles()
	const singaporeGyms = useSelector(state => state.firestore.data.gyms[GYMS_DOCUMENT_SINGAPORE].gyms) // TODO Change user data model so all the keys are under a map of countries
	const auth = useSelector(state => state.firebase.auth)

	function getGymsToAdd() {
		const gymsToAdd = {}
		const existingGyms = Object.keys(editableUserPasses)
		Object.keys(singaporeGyms).forEach(id => {
			if (!existingGyms.includes(id)) {
				gymsToAdd[id] = singaporeGyms[id]
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

	function submitChanges() {
		if (firebase.auth().currentUser.uid !== user.uid) {
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

	const [showLoading, setShowLoading] = useState(false)
	const [editableUserPasses, setEditableUserPasses] = useState(cloneDeep(user.passes))

	const [passDifferences, setPassDifferences] = useState({})
	useEffect(() => {
		setPassDifferences(calculatePassDifferences(user.passes, editableUserPasses))
	}, [user, editableUserPasses])

	const [hasNoChanges, setHasNoChanges] = useState(false)
	useEffect(() => {
		setHasNoChanges(Object.keys(passDifferences).length === 0 || Object.values(passDifferences).every(v => v === 0))
	}, [passDifferences])

	let counter = 0

	const [displayName, setDisplayName] = useState('')
	useEffect(() => {
		if (editable) {
			setDisplayName(`${user.firstName} ${user.lastName} (Me)`)
		} else {
			setDisplayName(`${user.firstName} ${user.lastName}`)
		}
	}, [user, editable])

	return (
		<>
			<CardHeader disableTypography title={
				<Typography variant="h6" data-test="user-name-card">{displayName}</Typography>
			} className={classes.name} />

			<CardContent className={classes.content}>
				{
					<div className={classes.gymsContent}>
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
														gymName={singaporeGyms[gymId] && singaporeGyms[gymId].name}
														gymLink={(singaporeGyms[gymId] && (singaporeGyms[gymId].appUrl || singaporeGyms[gymId].url)) || 'http://www.google.com'}
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
								<p className={classes.noPasses} data-test="no-passes"><b>{editable ? 'No passes here yet. Try adding some!' : 'No passes here yet. Ask them to add some!'}</b></p>
						}
					</div>
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

										<Tooltip disableFocusListener arrow enterTouchDelay={5} title="Reset changes">
											<span>
												<IconButton
													disabled={hasNoChanges}
													onClick={resetUserPasses}
													aria-label="Reset changes"
													data-test="reset-changes-button"
												>

													<ReplayIcon />
												</IconButton>
											</span>
										</Tooltip>
										<ConfirmationDialog isSubmitDisabled={hasNoChanges} passDifferences={passDifferences} onSubmit={submitChanges} />
									</>
							}
						</div>
						: null
				}
			</CardContent>
		</>
	)
}

PersonDetails.propTypes = {
	user: PropTypes.object.isRequired,
	editable: PropTypes.bool.isRequired
}

export default PersonDetails