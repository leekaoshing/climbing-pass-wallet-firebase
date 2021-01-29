import React from 'react'
import { Link } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import Paper from '@material-ui/core/Paper'
import { useFirebase, useFirestore } from 'react-redux-firebase'
import { makeStyles } from '@material-ui/core/styles'
import { ABOUT_PATH, LOGIN_PATH } from 'constants/paths'
import { useNotifications } from 'modules/notification'
import SignupForm from '../SignupForm'
import styles from './SignupPage.styles'
import { USERS_COLLECTION, USERS_PUBLIC_COLLECTION } from 'constants/firebasePaths'

const useStyles = makeStyles(styles)

function SignupPage() {
  const classes = useStyles()
  const { showError } = useNotifications()
  const firebase = useFirebase()
  const firestore = useFirestore()

  function onSubmitFail(formErrs, dispatch, err) {
    showError(formErrs ? 'Form Invalid' : err.message)
  }

  function googleLogin() {
    return firebase
      .login({ provider: 'google', type: 'popup' })
      .catch((err) => showError(err.message))
  }

  async function emailSignup(form) {
    const newUser = {
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      passes: {},
      friends: []
    }

    try {
      const { user } = await firebase.auth().createUserWithEmailAndPassword(newUser.email, form.password)
      await generateUserDocument(user, newUser)
      await generateUserPublicDocument(user, newUser)
    } catch (error) {
      showError(error.message)
    }
  }

  async function generateUserDocument(user, userData) {
    if (!user) return
    const userRef = firestore.doc(`${USERS_COLLECTION}/${user.uid}`)
    const snapshot = await userRef.get()

    if (!snapshot.exists) {
      await userRef.set({
        ...userData,
        uid: user.uid
      })
    } else {
      throw new Error('User already exists in database.')
    }
  }

  async function generateUserPublicDocument(user, userData) {
    if (!user) return
    const userRef = firestore.doc(`${USERS_PUBLIC_COLLECTION}/${user.uid}`)
    const snapshot = await userRef.get()

    if (!snapshot.exists) {
      await userRef.set({ 
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email, 
        uid: user.uid })
    } else {
      throw new Error('User already exists in database.')
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.about}>
        <span className={classes.aboutLabel}>New here?</span>
        <Link className={classes.aboutLink} to={ABOUT_PATH} data-test="about">
          About
        </Link>
      </div>
      <br/>
      <Paper className={classes.panel}>
        <SignupForm onSubmit={emailSignup} onSubmitFail={onSubmitFail} />
      </Paper>
      {/* <div className={classes.orLabel}>or</div>
      <div className={classes.providers}>
        <GoogleButton onClick={googleLogin} data-test="google-auth-button" />
      </div> */}
      <div className={classes.login}>
        <span className={classes.loginLabel}>Have an account?</span>
        <Link className={classes.loginLink} to={LOGIN_PATH} data-test="login">
          Login
        </Link>
      </div>
      <br/>
    </div>
  )
}

export default SignupPage
