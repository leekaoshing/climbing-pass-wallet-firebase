import { gql, useApolloClient } from '@apollo/client'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import { useNotifications } from 'modules/notification'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useFirestore } from 'react-redux-firebase'
import User from '../../../../model/User'
import { addUserToSearchList, removeUserFromSearchList } from '../../../../store/reducers/user'
import ViewFriends from './components/ViewFriends'
import styles from './UserSearch.styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(styles)

function UserSearch({ userSearchList, loggedInUser }) {
	const dispatch = useDispatch()
	const firestore = useFirestore()
	const classes = useStyles()
	const { showError } = useNotifications()
	const apolloClient = useApolloClient()

	const [searchText, setSearchText] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	function handleEnter(event) {
		if (event.key === 'Enter') {
			handleSearch(searchText)
		}
	}

	function handleChange(event) {
		setError('')
		setSearchText(event.target.value)
	}

	function addUserToSearchListHandler(user) {
		dispatch(addUserToSearchList(user))
	}

	function isUserAlreadyDisplayed(email) {
		return Object.values(userSearchList).filter(user => user.email === email).length > 0
	}

	async function handleSearch(searchText) {
		if (searchText !== '') {
			const searchTextLowerCase = searchText.toLowerCase()
			if (isUserAlreadyDisplayed(searchText)) {
				setError('Already displaying this user.')
				return
			}

			if (Object.keys(userSearchList).length >= 20) {
				setError('Can only display 20 users at once.')
				return
			}

			if (loggedInUser.email === searchText) {
				setSearchText('')
				addUserToSearchListHandler(User.createUser(
					true,
					loggedInUser.firstName,
					loggedInUser.lastName,
					loggedInUser.email,
					loggedInUser.uid,
					loggedInUser.friends,
					loggedInUser.passes
				))
				return
			}

			setLoading(true)
			apolloClient.query({
				query: gql`
					query GetUser($identifier: String!, $identifierType: String!) { 
						user(identifier: $identifier, identifierType: $identifierType) {
							canView
							firstName
							lastName
							email
							uid
							passes {
								gymId
								number
							}
						}
					}`,
				variables: { identifier: searchTextLowerCase, identifierType: "email" }
			})
				.then(result => {
					const user = result.data.user
					setSearchText('')

					const passes = {}
					user.passes.forEach(pass => {
						passes[pass.gymId] = pass.number
					})
					addUserToSearchListHandler(User.createUser(
						user.canView,
						user.firstName,
						user.lastName,
						user.email,
						user.uid,
						[],
						passes
					))
				})
				.catch(error => setError(error.message))
				.finally(() => setLoading(false))
		}
	}

	function onBlur() {
		setError('')
	}

	function categorizeUids(friendsList) {
		const uidsToDeselect = []
		const uidsToSearch = []

		Object.keys(friendsList).forEach(uid => {
			const userPublicDetails = friendsList[uid]
			if (userPublicDetails.isSelected) {
				if (userSearchList[uid] === undefined) {
					// Not in search list, need to fetch their details

					if (uid === loggedInUser.uid) {
						addUserToSearchListHandler(User.createUser(
							true,
							loggedInUser.firstName,
							loggedInUser.lastName,
							loggedInUser.email,
							loggedInUser.uid,
							loggedInUser.friends,
							loggedInUser.passes
						))
					} else {
						uidsToSearch.push(uid)
					}
				}
			} else {
				uidsToDeselect.push(uid)
			}
		})
		return [uidsToSearch, uidsToDeselect]
	}

	async function handleViewFriends(friendsList) {
		let [uidsToSearch, uidsToDeselect] = categorizeUids(friendsList)

		if (uidsToSearch.length > 0) {
			apolloClient.query({
				query: gql`
					query GetUsers($identifiers: [String!], $identifierType: String!) { 
						users(identifiers: $identifiers, identifierType: $identifierType) {
							canView
							firstName
							lastName
							email
							uid
							passes {
								gymId
								number
							}
						}
					}`,
				variables: { identifiers: uidsToSearch, identifierType: "uid" }
			})
				.then(result => {
					const users = result.data.users
					users.forEach(user => {
						const passes = {}
						user.passes.forEach(pass => {
							passes[pass.gymId] = pass.number
						})
						addUserToSearchListHandler(User.createUser(
							user.canView,
							user.firstName,
							user.lastName,
							user.email,
							user.uid,
							[],
							passes
						))
						uidsToSearch = uidsToSearch.filter(uid => uid !== user.uid)
					})

					if (uidsToSearch.length > 0) {
						const errorNames = []
						uidsToSearch.forEach(uid => {
							errorNames.push(`${friendsList[uid].firstName} ${friendsList[uid].lastName}`)
						})
						showError(`Unable to find users ${errorNames.join(', ')}.`)
					}
				})
				.catch(error => showError(error.message))
		}

		uidsToDeselect.forEach(uid => {
			dispatch(removeUserFromSearchList(uid))
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
							aria-label="Search for person using email"
							data-test="user-search-button"
						>
							{
								loading ? <CircularProgress /> : <SearchIcon />
							}
						</IconButton>
						<ViewFriends loggedInUser={loggedInUser} handleViewFriends={handleViewFriends} userSearchList={userSearchList} />
					</div>
				</div>
			</Grid>
		</Grid>
	)
}

UserSearch.propTypes = {
	userSearchList: PropTypes.object,
	loggedInUser: PropTypes.object,
}

export default UserSearch
