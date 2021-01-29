import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { isLoaded, useFirebase, useFirestore } from 'react-redux-firebase'
import LoadingSpinner from 'components/LoadingSpinner'
import { useNotifications } from 'modules/notification'
import defaultUserImageUrl from 'static/User.png'
import AccountForm from '../AccountForm'
import styles from './AccountEditor.styles'
import { USERS_COLLECTION } from 'constants/firebasePaths'

const useStyles = makeStyles(styles)

function AccountEditor() {
  const classes = useStyles()
  const { showSuccess, showError } = useNotifications()
  const firebase = useFirebase()
  const firestore = useFirestore()

  const auth = useSelector(state => state.firebase.auth)

  // Get profile from redux state
  const profile = useSelector(({ firebase }) => firebase.profile)

  if (!isLoaded(profile)) {
    return <LoadingSpinner />
  }

  async function updateAccount(details) {
    const emailLowerCase = details.email.toLowerCase()
    
    const detailsForFirestore = {
      firstName: details.firstName,
      lastName: details.lastName,
      email: emailLowerCase
    }

    const detailsForFirebaseProfile = {
      photoURL: details.avatarUrl
    }
    Promise.all([
      firestore.collection(USERS_COLLECTION).doc(auth.uid).update(detailsForFirestore),
      firebase.auth().currentUser.updateProfile(detailsForFirebaseProfile),
      firebase.auth().currentUser.updateEmail(emailLowerCase)
    ])
      .then(() => showSuccess('Profile updated successfully'))
      .catch(err => showError(`Error updating profile: ${err.message}`))
  }

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12} md={6} lg={6} className={classes.gridItem}>
        <img
          className={classes.avatarCurrent}
          src={(profile && profile.avatarUrl) || defaultUserImageUrl}
          alt=""
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} className={classes.gridItem}>
        <AccountForm onSubmit={updateAccount} account={profile} />
      </Grid>
    </Grid>
  )
}

export default AccountEditor
