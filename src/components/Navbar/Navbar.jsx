import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import LightThemeIcon from '@material-ui/icons/BrightnessHigh'
import DarkThemeIcon from '@material-ui/icons/Brightness4'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import HomeIcon from '@material-ui/icons/Home'
import { ABOUT_PATH, HOME_PATH } from 'constants/paths'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty, isLoaded } from 'react-redux-firebase'
import { Link, useHistory } from 'react-router-dom'
import AccountMenuWithAuth from './AccountMenuWithAuth'
import AccountMenuWithoutAuth from './AccountMenuWithoutAuth'
import styles from './Navbar.styles'
import { ThemeContext } from 'modules/theme'

const useStyles = makeStyles(styles)

function Navbar() {
	const classes = useStyles()
	const history = useHistory()

	// Get auth from redux state
	const auth = useSelector(({ firebase }) => firebase.auth)
	const authExists = isLoaded(auth) && !isEmpty(auth)

	const { toggleDarkMode, isDarkMode } = useContext(ThemeContext)
	const lightDarkButton = (
		<Tooltip title="Toggle light/dark theme">
			<IconButton
				onClick={toggleDarkMode}
				className={classes.themeModeButton}>
				{isDarkMode ? <LightThemeIcon /> : <DarkThemeIcon />}
			</IconButton>
		</Tooltip>
	)

	return (
		<AppBar position="static" className={classes.appBar}>
			<Toolbar>
				<IconButton edge="start" className={classes.homeButton} color="inherit" aria-label="menu" onClick={() => history.push(HOME_PATH)}>
					<HomeIcon />
				</IconButton>
				<Typography
					color="inherit"
					variant="body2"
					component={Link}
					to={HOME_PATH}
					className={classes.title}
					data-test="brand">
					Climbing Pass Wallet
      			</Typography>
				<div className={classes.flex} />
				{/* {lightDarkButton} */}
				<Button
					className={classes.about}
					onClick={() => history.push(ABOUT_PATH)}
					data-test='about-button-navbar'
				>
					About
      			</Button>
				{
					authExists ?
						<AccountMenuWithAuth />
						:
						<AccountMenuWithoutAuth />
				}
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
