import { makeStyles } from '@material-ui/core/styles'
import LoadingSpinner from 'components/LoadingSpinner'
import { GYMS_COLLECTION, USERS_COLLECTION, USERS_PUBLIC_COLLECTION } from 'constants/firebasePaths'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	isLoaded,
	useFirestoreConnect
} from 'react-redux-firebase'
import { addUserToSearchList, selectUserSearchList } from 'store/reducers/user'
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
			collection: USERS_PUBLIC_COLLECTION,
			doc: auth.uid
		},
		{
			collection: GYMS_COLLECTION
		}
	])

	// // Get user from redux state
	const users = useSelector(({ firestore: { data: { users } } }) => users)
	const usersPublic = useSelector(({ firestore: { data: { users_public } } }) => users) // eslint-disable-line camelcase
	const gyms = useSelector(({ firestore: { data: { gyms } } }) => gyms)

	return { users, gyms, usersPublic, uid: auth.uid }
}

function Home() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userSearchList = useSelector(selectUserSearchList)

  const {
		uid,
		users,
		usersPublic,
		gyms
  } = useHome()

  useEffect(() => {
		if (users && users[uid]) dispatch(addUserToSearchList(users[uid]))
	}, [dispatch, uid, users])
  
  if (!isLoaded(users) || !isLoaded(gyms) || !users || !gyms || !users[uid] || !usersPublic || !usersPublic[uid]) {
		return <LoadingSpinner />
	}

  return (
    <div className={classes.root}>
      <UserSearch userSearchList={userSearchList} loggedInUser={users[uid]} loggedInUserPublic={usersPublic[uid]}/>
      <PassesList userSearchList={userSearchList}/>
      <UpdateResultDialog />
    </div>
  )
}

export default Home
