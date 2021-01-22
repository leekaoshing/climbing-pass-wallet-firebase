import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { LOGIN_PATH, SIGNUP_PATH } from 'constants/paths'
import React, { useState } from 'react'
import { useFirebase } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import styles from './Navbar.styles'

const useStyles = makeStyles(styles)

function AccountMenuWithoutAuth() {
	const classes = useStyles()
	const [anchorEl, setMenu] = useState(null)
	const firebase = useFirebase()

	function closeAccountMenu() {
		setMenu(null)
	}
	function handleMenuClick(e) {
		setMenu(e.target)
	}

	return (
		<>
			<IconButton
				aria-owns={anchorEl ? 'menu-appbar' : null}
				aria-haspopup="true"
				onClick={handleMenuClick}
				classes={{ root: classes.accountButton }}>
				<AccountCircle />
			</IconButton>
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={Boolean(anchorEl)}
				onClose={closeAccountMenu}
			>
				<MenuItem component={Link} to={SIGNUP_PATH} onClick={closeAccountMenu}>
					Sign Up
      			</MenuItem>
				<MenuItem component={Link} to={LOGIN_PATH} onClick={closeAccountMenu}>
					Log In
      			</MenuItem>
			</Menu>
		</>
	)
}

export default AccountMenuWithoutAuth
