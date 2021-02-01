import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import { attachCustomCommands } from 'cypress-firebase'

const projectId = Cypress.env('FIREBASE_projectId')
const apiKey = Cypress.env('FIREBASE_apiKey')

const fbConfig = {
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  projectId: `${projectId}`,
  storageBucket: `${projectId}.appspot.com`
}

firebase.initializeApp(fbConfig)

// Settings here are for Cypress commands in test (e.g. cy.login()), so these commands go to emulator
const firestoreEmulatorHost = Cypress.env("FIRESTORE_EMULATOR_HOST");
if (firestoreEmulatorHost) {
  console.debug('Using emulator host for Cypress: ', firestoreEmulatorHost)
  firebase.auth().useEmulator(`http://${firestoreEmulatorHost}:9099/`)

  firebase.firestore().settings({
    host: `${firestoreEmulatorHost}:9091`,
    ssl: false
  })
}

Cypress.Commands.add('createUser', async (details) => {
  const { user } = await firebase.auth().createUserWithEmailAndPassword(details.email, details.password)
  return user.uid
})

Cypress.Commands.add('deleteCurrentUser', async () => {
  const user = firebase.auth().currentUser;
  const uid = user.uid

  user.delete().then(() => {
    console.debug(`Deleted user '${uid}'`)
  }).catch((error) => {
    console.error(error.message)
  });
})

Cypress.Commands.add('addInfo', uid => {
  console.log('start addinfo', uid)
  firebase.firestore().collection('users').doc(uid).set({
    hello: 'there'
  }).then(() => {
    console.log('added addinfo')
  }).catch(err => {
    console.error('HELP', err.message)
  })
})

// Custom commands including login, signup, callRtdb, and callFirestore
attachCustomCommands({ Cypress, cy, firebase })
