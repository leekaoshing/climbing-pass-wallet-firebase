import { Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import {
	useFirebase
} from 'react-redux-firebase'
import PersonTile from '../PersonTile'
import styles from './PassesList.styles'

const useStyles = makeStyles(styles)

function PassesList({ userSearchList }) {
	const firebase = useFirebase()
	const classes = useStyles()

	function isLoggedInUser(user) {
		return user.email === firebase.auth().currentUser.email
	}

	const users = Object.keys(userSearchList)

	return (
		<div className={classes.root}  >
			<Grid container justify="center">
				{
					users.length === 0 ?
						<Typography variant="h6" className={classes.emptyText}>Search for a friend using the box above!</Typography>
						:
						users.length === 1 ?
							<Grid item xs={9} sm={8} md={6} lg={3} xl={3} className={classes.gridItem} key={userSearchList[users[0]].email}>
								<PersonTile user={userSearchList[users[0]]} editable={isLoggedInUser(userSearchList[users[0]])} />
							</Grid>
							:
							users.map(email => {
								const user = userSearchList[email]
								return (
									<Grid item xs={6} sm={3} md={3} lg={2} xl={1} className={classes.gridItem} key={user.email}>
										<PersonTile user={user} editable={isLoggedInUser(user)} />
									</Grid>
								)
							})
				}
			</Grid>
		</div>
	)

}

PassesList.propTypes = {
	userSearchList: PropTypes.object
}

export default PassesList
