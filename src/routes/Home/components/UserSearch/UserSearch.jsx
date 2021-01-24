import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { USERS_COLLECTION } from 'constants/firebasePaths'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	useFirestore
} from 'react-redux-firebase'
import { addUserToSearchList, removeUserFromSearchList } from '../../../../store/reducers/user'
import styles from './UserSearch.styles'
import Autocomplete from '@material-ui/lab/Autocomplete'

const useStyles = makeStyles(styles)

function UserSearch({ userSearchList }) {
	const dispatch = useDispatch()
	const firestore = useFirestore()
	const classes = useStyles()

	const auth = useSelector(state => state.firebase.auth)
	const loggedInUser = useSelector(state => state.firestore.data.users[auth.uid])

	const [searchText, setSearchText] = useState('')
	const [error, setError] = useState('')

	function handleDelete(user) {
		dispatch(removeUserFromSearchList(user.email))
	}

	function handleEnter(event) {
		if (event.key === 'Enter') {
			handleSearch()
		}
	}

	function handleChange(event, value) {
		setError('')
		setSearchText(value)
	}

	function handleSearch() {
		if (searchText !== '') {
			const searchTextLowerCase = searchText.toLowerCase()
			if (userSearchList[searchTextLowerCase] !== undefined) {
				setError('Already searched for this user.')
				return
			}
			firestore.collection(USERS_COLLECTION)
				.where('email', '==', searchTextLowerCase)
				.get()
				.then(results => {
					if (results.empty) throw new Error('Unable to find user.')
					setSearchText('')
					dispatch(addUserToSearchList(results.docs[0].data()))
				})
				.catch(error => {
					setError(error.message)
				})
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
					style={{ width: 220 }}
					options={loggedInUser.friends.map(option => option)}
					onChange={handleChange}
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
			&nbsp; &nbsp;
				<div className={classes.searchButton}>
					<Button
						variant="outlined"
						onClick={handleSearch}
					>
						Search
					</Button>
				</div>
			</div>
			<div className={classes.users}>
				{
					Object.keys(userSearchList).map((email) => {
						const user = userSearchList[email]
						return (
							<li key={user.email}>
								<Chip
									label={`${user.firstName} ${user.lastName}`}
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
	userSearchList: PropTypes.object
}

export default UserSearch
