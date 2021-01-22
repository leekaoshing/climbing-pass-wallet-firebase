import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/performance'

export default function initializeFirebase() {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_apiKey,
    authDomain: process.env.REACT_APP_FIREBASE_authDomain,
    projectId: process.env.REACT_APP_FIREBASE_projectId,
    storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
    messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
    measurementId: process.env.REACT_APP_FIREBASE_measurementId,
    appId: process.env.REACT_APP_FIREBASE_appId
  }

  // Initialize Firebase instance
  firebase.initializeApp(firebaseConfig)

  // Set emulator ports
  const auth = firebase.auth()
  const firestore = firebase.firestore()
  if (window.location.hostname === "localhost") {  // Emulator
    firestore.useEmulator("192.168.1.19", 9091)
    auth.useEmulator('http://192.168.1.19:9099/')
  }

  // Initialize Firebase analytics if measurementId exists
  if (firebaseConfig.measurementId) {
    firebase.analytics()
  }

  // Enable Firestore emulator if environment variable is set
  if (process.env.REACT_APP_FIRESTORE_EMULATOR_HOST) {
    /* eslint-disable no-console */
    console.debug(
      `Firestore emulator enabled: ${process.env.REACT_APP_FIRESTORE_EMULATOR_HOST}`
    )
    /* eslint-enable no-console */
    firebase.firestore().settings({
      host: process.env.REACT_APP_FIRESTORE_EMULATOR_HOST,
      ssl: false
    })
  }
}
