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

  // Initialize Firebase analytics if measurementId exists
  if (firebaseConfig.measurementId) {
    firebase.analytics()
  }

  if (window.location.hostname === "localhost") {  // Emulator
    // firebase.firestore().useEmulator("192.168.1.19", 9091)

    firebase.auth().useEmulator('http://192.168.1.19:9099/')
    // Cypress UI tests go through emulator also if running through UI (not by cy commands)

    const firestoreSettings = {
      host: '192.168.1.19:9091',
      ssl: false
    }
    if (window.Cypress) {
      // Needed for Firestore support in Cypress (see https://github.com/cypress-io/cypress/issues/6350)
      console.debug('Using Cypress, set experimentalForceLongPolling=true')
      firestoreSettings.experimentalForceLongPolling = true
    }
    
    firebase.firestore().settings(firestoreSettings)
  }

  // const firestoreSettings = {}
  // // Pass long polling setting to Firestore when running in Cypress
  // if (window.Cypress) {
  //   // Needed for Firestore support in Cypress (see https://github.com/cypress-io/cypress/issues/6350)
  //   firestoreSettings.experimentalForceLongPolling = true
  // }

  // // Emulate Firestore
  // if (process.env.REACT_APP_FIRESTORE_EMULATOR_HOST) {
  //   firebase.firestore().useEmulator("192.168.1.19", 9091)
  //   // firestoreSettings.host = "http://localhost:9091"
  //   // firestoreSettings.ssl = false
  //   console.debug(`Using Firestore emulator: ${firestoreSettings.host}`)

  //   firebase.firestore().settings(firestoreSettings)

  // }

  // // Emulate auth
  // if (process.env.REACT_APP_AUTH_EMULATOR_HOST) {
  //   const authEmulatorHost = process.env.REACT_APP_AUTH_EMULATOR_HOST
  //   console.debug(`Using Auth emulator: ${authEmulatorHost}`)

  //   firebase.auth().useEmulator("http://localhost:9099")
  // }


  // // Enable Firestore emulator if environment variable is set
  // if (process.env.REACT_APP_FIRESTORE_EMULATOR_HOST) {
  //   /* eslint-disable no-console */
  //   console.debug(
  //     `Firestore emulator enabled: ${process.env.REACT_APP_FIRESTORE_EMULATOR_HOST}`
  //   )
  //   /* eslint-enable no-console */
  //   firebase.firestore().settings({
  //     host: process.env.REACT_APP_FIRESTORE_EMULATOR_HOST,
  //     ssl: false
  //   })
  // }
}
