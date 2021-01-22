import { blue } from '@material-ui/core/colors'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import CallMadeIcon from '@material-ui/icons/CallMade'
import RemoveIcon from '@material-ui/icons/Remove'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setPassesForGym } from 'store/reducers/user'
import styles from './GymPassesTile.styles'

const useStyles = makeStyles(styles)

function GymPassesTile({ gymId, gymName, gymLink, numberOfPasses, passDifference }) {
	const classes = useStyles()
	const dispatch = useDispatch()

	const getTextStyle = () => {
		if (passDifference !== 0) {
			return { color: blue[600], fontWeight: 'bold', fontSize: '14px' }
		}
		return { fontSize: '14px' }
	}

	function changePass(gymId, increment) {
		if (numberOfPasses === 0 && increment < 0) {
			return
		}
		dispatch(setPassesForGym({
			gymId,
			numberOfPasses: numberOfPasses + increment
		}))
	}

	function openGymLink(gymLink) {
		window.open(gymLink)
	}

	return (
		<ListItem>
			<Paper className={classes.root}>
				<div className={classes.top}>
					<Grid container>
						<Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							<span style={{ fontSize: '12px' }} data-test={`gym-name-${gymId}`}>{gymName}</span>
						</Grid>
						<Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							<IconButton aria-label="decrementPass" data-test={`decrement-pass-${gymId}`} onClick={() => changePass(gymId, -1)}>
								<RemoveIcon />
							</IconButton>
						</Grid>
						<Grid item xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							<span style={getTextStyle()} data-test={`passes-${gymId}`} >{numberOfPasses}</span>
						</Grid>
						<Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							<IconButton aria-label="incrementPass" data-test={`increment-pass-${gymId}`} onClick={() => changePass(gymId, 1)}>
								<AddIcon />
							</IconButton>
						</Grid>
						<Grid item xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							<IconButton aria-label="buyPasses" onClick={() => openGymLink(gymLink)} className={classes.buyButton} variant="contained">
								<span style={{ fontSize: 8 }} data-test={`gym-link-${gymId}`}>Buy</span> &nbsp; <CallMadeIcon style={{ fontSize: 8 }} />
							</IconButton>
						</Grid>
					</Grid>
				</div>
			</Paper>
		</ListItem>
	)
}

GymPassesTile.propTypes = {
	numberOfPasses: PropTypes.number,
	passDifference: PropTypes.number,
	gymId: PropTypes.string,
	gymLink: PropTypes.string,
	gymName: PropTypes.string
}

export default GymPassesTile
