import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import LoadingSpinner from 'components/LoadingSpinner'
import { GYMS_COLLECTION, USERS_COLLECTION } from 'constants/firebasePaths'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	isLoaded,
	useFirebase,
	useFirestoreConnect
} from 'react-redux-firebase'
import { addUserToSearchList } from '../../../../store/reducers/user'
import PersonTile from '../PersonTile'
import styles from './PassesList.styles'

const useStyles = makeStyles(styles)

// function usePassesList() {
// 	// Get auth from redux state
// 	const auth = useSelector(({ firebase: { auth } }) => auth)

// 	useFirestoreConnect([
// 		{
// 			collection: USERS_COLLECTION,
// 			doc: auth.uid
// 		},
// 		{
// 			collection: GYMS_COLLECTION
// 		}
// 	])

// 	// // Get user from redux state
// 	const users = useSelector(({ firestore: { data: { users } } }) => users)
// 	const gyms = useSelector(({ firestore: { data: { gyms } } }) => gyms)

// 	return { users, gyms, uid: auth.uid }
// }

function PassesList({ userSearchList }) {
	const dispatch = useDispatch()
	const firebase = useFirebase()
	const classes = useStyles()

	// const {
	// 	uid,
	// 	users,
	// 	gyms
	// } = usePassesList()

	// useEffect(() => {
	// 	if (users && users[uid]) dispatch(addUserToSearchList(users[uid]))
	// }, [dispatch, uid, users])

	// if (!isLoaded(users) || !isLoaded(gyms) || !users || !gyms || !users[uid]) {
	// 	return <LoadingSpinner />
	// }

	function isLoggedInUser(user) {
		return user.email === firebase.auth().currentUser.email
	}

	return (
		<div className={classes.root}  >
			<Grid container justify="center">
				{
					Object.keys(userSearchList).map(email => {
						const user = userSearchList[email]
						return (
							<Grid item xs={6} sm={3} md={2} lg={2} xl={1} className={classes.gridItem} key={user.email}>
								<PersonTile user={user} editable={isLoggedInUser(user)} />
							</Grid>
						)
					})
				}
			</Grid>
		</div>
	)

}

PassesList.propTypes = {
	userSearchList: PropTypes.object
}

export default PassesList
