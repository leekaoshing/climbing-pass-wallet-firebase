import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUserToSearchList, selectUserSearchList } from 'store/reducers/user'
import PassesList from '../PassesList'
import UpdateResultDialog from '../UpdateResultDialog'
import UserSearch from '../UserSearch'
import styles from './HomePage.styles'
import LoadingSpinner from 'components/LoadingSpinner'

import { GYMS_COLLECTION, USERS_COLLECTION } from 'constants/firebasePaths'
import {
	isLoaded,
	useFirebase,
	useFirestoreConnect
} from 'react-redux-firebase'

const useStyles = makeStyles(styles)

function usePassesList() {
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

	// // Get user from redux state
	const users = useSelector(({ firestore: { data: { users } } }) => users)
	const gyms = useSelector(({ firestore: { data: { gyms } } }) => gyms)

	return { users, gyms, uid: auth.uid }
}

function Home() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userSearchList = useSelector(selectUserSearchList)

  const {
		uid,
		users,
		gyms
  } = usePassesList()

  useEffect(() => {
		if (users && users[uid]) dispatch(addUserToSearchList(users[uid]))
	}, [dispatch, uid, users])
  
  if (!isLoaded(users) || !isLoaded(gyms) || !users || !gyms || !users[uid]) {
		return <LoadingSpinner />
	}

  return (
    <div className={classes.root}>
      <UserSearch userSearchList={userSearchList}/>
      <PassesList userSearchList={userSearchList}/>
      <UpdateResultDialog />
    </div>
  )
}

export default Home
