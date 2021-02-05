import { Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import PersonTile from '../PersonTile'
import styles from './PassesList.styles'

const useStyles = makeStyles(styles)

function PassesList({ userSearchList, loggedInUser }) {
	const classes = useStyles()

	function isLoggedInUser(user) {
		return user.email === loggedInUser.email
	}

	// const a = []
	// const b = []
	// const c = []
	// Object.keys(userSearchList).forEach(email => {
	// 	const user = userSearchList[email]
	// 	if (isLoggedInUser(user)) {
	// 		a.push(email)
	// 	} else if (loggedInUser.friends.includes(user.uid)) {
	// 		b.push(email)
	// 	} else {
	// 		c.push(email)
	// 	}
	// })
	// const users = a.concat(b).concat(c)
	// const users = a.concat(b.sort()).concat(c.sort()) // For sorting users alphabetically within each category

	const userUids = Object.keys(userSearchList)

	return (
		<div className={classes.root}  >
			<Grid container justify="center">
				{
					userUids.length === 0 ?
						<Typography variant="h6" className={classes.emptyText}>Search for a friend using the box above!</Typography>
						:
						userUids.length === 1 ?
							<Grid item xs={9} sm={8} md={6} lg={3} xl={3} className={classes.gridItem} key={userSearchList[userUids[0]].email}>
								<PersonTile user={userSearchList[userUids[0]]} editable={isLoggedInUser(userSearchList[userUids[0]])} />
							</Grid>
							:
							userUids.map(uid => {
								const user = userSearchList[uid]
								return (
									<Grid item xs={6} sm={4} md={4} lg={3} xl={3} className={classes.gridItem} key={user.email}>
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
	userSearchList: PropTypes.object,
	loggedInUser: PropTypes.object
}

export default PassesList
