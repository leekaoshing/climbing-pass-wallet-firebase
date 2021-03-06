import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import LoadingSpinner from 'components/LoadingSpinner'
import { GYMS_COLLECTION, GYMS_DOCUMENT_SINGAPORE, USERS_COLLECTION } from 'constants/firebasePaths'
import { useNotifications } from 'modules/notification'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	isLoaded,
	useFirestore,
	useFirestoreConnect
} from 'react-redux-firebase'
import { addUserToSearchList, selectUserSearchList } from 'store/reducers/user'
import User from '../../../../model/User'
import PassesList from '../PassesList'
import UpdateResultDialog from '../UpdateResultDialog'
import UserSearch from '../UserSearch'
import styles from './HomePage.styles'

const useStyles = makeStyles(styles)

function useHome() {
	// Get auth from redux state
	const auth = useSelector(({ firebase: { auth } }) => auth)

	useFirestoreConnect([
		{
			collection: USERS_COLLECTION,
			doc: auth.uid
		},
		{
			collection: GYMS_COLLECTION,
			doc: GYMS_DOCUMENT_SINGAPORE
		}
	])

	// // Get user from redux state
	const users = useSelector(({ firestore: { data: { users } } }) => users)
	const gyms = useSelector(({ firestore: { data: { gyms } } }) => gyms)

	return { users, gyms, uid: auth.uid }
}

function Home() {
	const classes = useStyles()
	const dispatch = useDispatch()
	const userSearchList = useSelector(selectUserSearchList)
	const firestore = useFirestore()
	const { showError } = useNotifications()

	const {
		uid,
		users,
		gyms
	} = useHome()

	const [loading, setLoading] = useState(true)
	useEffect(() => {
		// This reruns if you add/remove friends because the "users" object (since users[uid].friends changes)
		// if (users && users[uid]) dispatch(addUserToSearchList(users[uid]))

		setLoading(true)
		setTimeout(() => { // Delay is for user documents to be created after signup, as signup immediately redirects to homepage once an account is created
			firestore.collection(USERS_COLLECTION).doc(uid).get()
				.then(result => {
					const user = result.data()

					// Add logged in user to search list
					dispatch(addUserToSearchList(User.createUser(
						true,
						user.firstName,
						user.lastName,
						user.email,
						user.uid,
						user.friends,
						user.passes
					)))
					setLoading(false)
				})
				.catch(error => {
					showError(error.message)
					setLoading(false)
				})
		}, 500)
	}, [dispatch, firestore, uid, showError])

	if (loading || !isLoaded(users) || !isLoaded(gyms) || !users || !gyms || !gyms[GYMS_DOCUMENT_SINGAPORE] || !users[uid]) {
		return <LoadingSpinner />
	}

	return (
		<Grid container className={classes.root} justify="center">
			<Grid item xs={12} md={10} lg={8} className={classes.gridItem}>
				<UserSearch userSearchList={userSearchList} loggedInUser={users[uid]} />
				<PassesList userSearchList={userSearchList} loggedInUser={users[uid]} />
				<UpdateResultDialog />
			</Grid>
		</Grid>
	)
}

export default Home
