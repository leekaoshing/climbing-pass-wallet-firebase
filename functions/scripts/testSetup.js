/* eslint-disable no-unused-vars */
import functionsTestSetup from 'firebase-functions-test'
import * as admin from 'firebase-admin'
const projectId = 'unit-test-project'
const { FIRESTORE_EMULATOR_HOST } = process.env

// Setup firebase-functions-tests to online mode (will communicate with emulators)
global.functionsTest = functionsTestSetup({
  storageBucket: `${projectId}.appspot.com`,
  projectId
})

global.projectId = projectId

// Initialize admin SDK with emulator settings for RTDB (needed to
// prevent error from initializeApp not being called since it is in index.js)
admin.initializeApp({
  projectId,
  credential: admin.credential.applicationDefault()
})

// Initialize Firestore with emulator settings from environment
const [servicePath, portStr] = FIRESTORE_EMULATOR_HOST.split(':')
admin.firestore().settings({
  servicePath,
  port: parseInt(portStr, 10)
})
