import Chip from '@material-ui/core/Chip'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
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

const useStyles = makeStyles(styles)

function UserSearch({ userSearchList, loggedInUser, loggedInUserPublic }) {
	const dispatch = useDispatch()
	const firestore = useFirestore()
	const firebase = useFirebase()
	const classes = useStyles()

	const [friendsList, setFriendsList] = useState([loggedInUserPublic])
	const [searchSuggestions, setSearchSuggestions] = useState([])

	useEffect(() => {
		setFriendsList(() => [
			loggedInUserPublic
		])
	}, [loggedInUserPublic])

	useEffect(() => {
		if (loggedInUser.friends.length > 0) {
			firestore.collection(USERS_PUBLIC_COLLECTION).where(firebase.firestore.FieldPath.documentId(), 'in', loggedInUser.friends)
				.get()
				.then(results => {
					results.forEach(result => {
						setFriendsList(friendsList => [
							...friendsList,
							result.data()
						])
					})
				})
		}
	}, [loggedInUser, firebase.firestore.FieldPath, firestore])

	useEffect(() => {
		const searchedEmails = Object.keys(userSearchList)
		setSearchSuggestions(() => friendsList.filter(user => !searchedEmails.includes(user.email)))
	}, [userSearchList, friendsList])

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

	function handleChange(event, value) {
		setError('')
		setSearchText(value)
	}

	function handleSelect(event, value) {
		setError('')
		if (value) handleSearch(value)
		setSearchText('')
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
						email: searchTextLowerCase,
						uid: userPublicDetails.uid,
						isFriend: false
					}))
				} else {
					const userDetails = userDetailsResults.docs[0].data()
					setSearchText('')
					dispatch(addUserToSearchList({
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

	return (
		<div className={classes.root}>
			<div className={classes.search} >
				<Autocomplete
					id="user-search-field-autocomplete"
					freeSolo
					className={classes.searchBox}
					// style={{ width: 210, marginLeft: '10px', marginRight: '10px' }}
					options={searchSuggestions.map(option => option.email)}
					onChange={handleSelect}
					onInputChange={handleChange}
					onKeyDown={handleEnter}
					value={searchText}
					renderInput={(params) => (
						<TextField {...params}
							data-test="user-search-field"
							label="Search for email...."
							variant="outlined"
							helperText={error}
							error={!!error}
							onBlur={onBlur}
						/>
					)}
				/>
				<div className={classes.searchButton}>
					<IconButton
						variant="outlined"
						onClick={() => handleSearch(searchText)}
					>
						<SearchIcon />
					</IconButton>
				</div>
			</div>
			<div className={classes.users}>
				{/* <Button
						variant="outlined"
						onClick={() => handleSearch(searchText)}
						style={{alignSelf: 'flex-start'}}
					>
						Friends
					</Button> */}
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
			{/* </Paper> */}
		</div>
	)
}

UserSearch.propTypes = {
	userSearchList: PropTypes.object,
	loggedInUser: PropTypes.object,
	loggedInUserPublic: PropTypes.object
}

export default UserSearch
