import { actionTypes } from 'redux-firestore'
import { resetState as resetDialogState } from 'store/reducers/dialog'
import { resetState as resetUserState } from 'store/reducers/user'
import { setAnalyticsUser } from 'utils/analytics'
import { setErrorUser } from 'utils/errorHandler'

// ======================================================
// Default Redux + Firebase Config used for all environments
// (for react-redux-firebase & redux-firestore)
// Note: Differs from src/config.js which is environment specific config
// ======================================================
export const defaultRRFConfig = {
  userProfile: 'users', // root that user profiles are written to
  updateProfileOnLogin: false, // enable/disable updating of profile on login
  presence: 'presence', // list currently online users under "presence" path in RTDB
  sessions: null, // Skip storing of sessions
  useFirestoreForProfile: true, // Save profile to Firestore instead of Real Time Database
  useFirestoreForStorageMeta: true, // Metadata associated with storage file uploads goes to Firestore
  onAuthStateChanged: (auth, firebaseInstance, dispatch) => {
    if (auth) {
      // Set auth within error handler
      setErrorUser(auth)
      // Set auth within analytics
      setAnalyticsUser(auth)
    }
    if (!auth) {
      dispatch(resetDialogState())
      dispatch(resetUserState())
      dispatch({ type: actionTypes.CLEAR_DATA })
    }
  }
}
