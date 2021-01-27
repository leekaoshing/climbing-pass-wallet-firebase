import Chip from '@material-ui/core/Chip'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import SearchIcon from '@material-ui/icons/Search'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { USERS_COLLECTION, USERS_PUBLIC_COLLECTION } from 'constants/firebasePaths'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
	useFirebase, useFirestore
} from 'react-redux-firebase'
import { addUserToSearchList, removeUserFromSearchList } from '../../../../store/reducers/user'
import styles from './UserSearch.styles'
import PeopleIcon from '@material-ui/icons/People'
import ViewFriends from './components/ViewFriends'
import { useNotifications } from 'modules/notification'

const useStyles = makeStyles(styles)

function UserSearch({ userSearchList, loggedInUser, loggedInUserPublic }) {
	const dispatch = useDispatch()
	const firestore = useFirestore()
	const firebase = useFirebase()
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
					dispatch(addUserToSearchList({
						...userPublicDetails,
						isFriend: false
					}))
				} else {
					const userDetails = userDetailsResults.docs[0].data()
					setSearchText('')
					dispatch(addUserToSearchList({
						...userPublicDetails,
						...userDetails,
						isFriend: true
					}))
				}
			} catch (error) {
				setError(error.message)
			}
		}
	}

	function onBlur() {
		setError('')
	}

	async function handleViewFriends(selectedFriends) {
		// TODO Maybe show loading screen and then remove when Promise.all?
		Object.keys(selectedFriends).forEach(uid => {
			const userPublicDetails = selectedFriends[uid]
			firestore.collection(USERS_COLLECTION)
				.where('email', '==', userPublicDetails.email) // TODO Can't query by UID, need backend to solve probably
				.where('friends', 'array-contains', loggedInUser.uid)
				.get()
				.then(userDetailsResult => {
					if (userDetailsResult.empty) {
						setSearchText('')
						dispatch(addUserToSearchList({
							...userPublicDetails,
							isFriend: false
						}))
					} else {
						const userDetails = userDetailsResult.docs[0].data()
						setSearchText('')
						dispatch(addUserToSearchList({
							...userPublicDetails,
							...userDetails,
							isFriend: true
						}))
					}
				})
				.catch(error => showError(error.message))
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
						{/* <IconButton
							onClick={handleAddFriends}
							className={classes.iconButton}
						>
							<PeopleIcon />
						</IconButton> */}
						<ViewFriends loggedInUser={loggedInUser} handleViewFriends={handleViewFriends} />
					</div>
				</div>
				<div className={classes.users}>
					{
						Object.keys(userSearchList).map((email) => {
							const user = userSearchList[email]
							const displayText = user.isFriend || user.email === loggedInUserPublic.email ? `${user.firstName} ${user.lastName}` : user.email
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
				</div>
			</Grid>
		</Grid>
	)
}

UserSearch.propTypes = {
	userSearchList: PropTypes.object,
	loggedInUser: PropTypes.object,
	loggedInUserPublic: PropTypes.object
}

export default UserSearch
