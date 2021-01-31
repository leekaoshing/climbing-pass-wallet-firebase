import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import { USERS_COLLECTION, USERS_PUBLIC_COLLECTION } from 'constants/firebasePaths'
import { useNotifications } from 'modules/notification'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useFirestore } from 'react-redux-firebase'
import User from '../../../../model/User'
import { addUserToSearchList, removeUserFromSearchList } from '../../../../store/reducers/user'
import ViewFriends from './components/ViewFriends'
import styles from './UserSearch.styles'

const useStyles = makeStyles(styles)

function UserSearch({ userSearchList, loggedInUser }) {
	const dispatch = useDispatch()
	const firestore = useFirestore()
	const classes = useStyles()
	const { showError } = useNotifications()

	const [searchText, setSearchText] = useState('')
	const [error, setError] = useState('')

	function handleDelete(user) {
		dispatch(removeUserFromSearchList(user.email))
	}

	function handleEnter(event) {
		if (event.key === 'Enter') {
			handleSearch(searchText)
		}
	}

	function handleChange(event) {
		setError('')
		setSearchText(event.target.value)
	}

	async function handleSearch(searchText) {
		if (searchText !== '') {
			const searchTextLowerCase = searchText.toLowerCase()
			if (userSearchList[searchTextLowerCase] !== undefined) {
				setError('Already displaying this user.')
				return
			}

			if (Object.keys(userSearchList).length >= 20) {
				setError('Can only display 20 users at once.')
				return
			}

			if (loggedInUser.email === searchText) {
				setSearchText('')
				dispatch(addUserToSearchList(loggedInUser))
				return
			}

			try {
				const userPublicDetailsResults = await firestore.collection(USERS_PUBLIC_COLLECTION)
					.where('email', '==', searchTextLowerCase)
					.get()
				if (userPublicDetailsResults.empty) throw new Error('Unable to find user.')
				const userPublicDetails = userPublicDetailsResults.docs[0].data()

				const userDetailsResults = await firestore.collection(USERS_COLLECTION)
					.where('email', '==', searchTextLowerCase)
					.where('friends', 'array-contains', loggedInUser.uid)
					.get()

				if (userDetailsResults.empty) {
					setSearchText('')
					dispatch(addUserToSearchList(User.createUser(
						false,
						userPublicDetails.firstName,
						userPublicDetails.lastName,
						userPublicDetails.email,
						userPublicDetails.uid,
						null,
						null
					)))
				} else {
					const userDetails = userDetailsResults.docs[0].data()
					setSearchText('')
					dispatch(addUserToSearchList(User.createUser(
						true,
						userPublicDetails.firstName,
						userPublicDetails.lastName,
						userPublicDetails.email,
						userPublicDetails.uid,
						userDetails.friends,
						userDetails.passes
					)))
				}
			} catch (error) {
				setError(error.message)
			}
		}
	}

	function onBlur() {
		setError('')
	}

	async function handleViewFriends(friendsList) {
		Object.keys(friendsList).forEach(uid => {
			const userPublicDetails = friendsList[uid]

			const email = userPublicDetails.email

			if (userPublicDetails.isSelected) {
				if (userSearchList[email] === undefined) {
					firestore.collection(USERS_COLLECTION)
						.where('email', '==', email) // TODO for future: can't query by UID, need backend to solve probably
						.where('friends', 'array-contains', loggedInUser.uid)
						.get()
						.then(userDetailsResult => {
							if (userDetailsResult.empty) {
								setSearchText('')
								dispatch(addUserToSearchList({
									...userPublicDetails,
									canView: false
								}))
							} else {
								const userDetails = userDetailsResult.docs[0].data()
								setSearchText('')
								dispatch(addUserToSearchList({
									...userPublicDetails,
									...userDetails,
									canView: true
								}))
							}
						})
						.catch(error => showError(error.message))
				}
			} else {
				dispatch(removeUserFromSearchList(email))
			}
		})
	}

	return (
		<Grid container className={classes.root}>
			<Grid item xs={12} md={10} lg={8} className={classes.gridItem}>
				<div className={classes.search}>
					<TextField
						onChange={handleChange}
						onKeyDown={handleEnter}
						data-test="user-search-field"
						label="Search for email...."
						variant="outlined"
						value={searchText}
						helperText={error}
						error={!!error}
						onBlur={onBlur}
					/>
					<div className={classes.buttons}>
						<IconButton
							onClick={() => handleSearch(searchText)}
							className={classes.iconButton}
						>
							<SearchIcon />
						</IconButton>
						<ViewFriends loggedInUser={loggedInUser} handleViewFriends={handleViewFriends} userSearchList={userSearchList} />
					</div>
				</div>
				{/* <div className={classes.users}>
					{
						Object.keys(userSearchList).map((email) => {
							const user = userSearchList[email]
							const displayText = `${user.firstName} ${user.lastName}`
							return (
								<li key={user.email}>
									<Chip
										label={displayText}
										onDelete={() => handleDelete(user)}
										className={classes.chip}
									/>
								</li>
							)
						})
					}
				</div> */}
			</Grid>
		</Grid>
	)
}

UserSearch.propTypes = {
	userSearchList: PropTypes.object,
	loggedInUser: PropTypes.object,
}

export default UserSearch
