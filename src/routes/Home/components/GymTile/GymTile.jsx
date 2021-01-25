import { Avatar } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import styles from './GymTile.styles'

const useStyles = makeStyles(styles)

function GymTile({ gymId, gymName, gymLink, numberOfPasses, passDifference, editable, setPassesFunction }) {
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
		setPassesFunction(gymId, numberOfPasses + increment)
	}

	function openGymLink(gymLink) {
		window.open(gymLink)
	}

	return (
		<ListItem>
			{/* <Paper className={classes.root}> */}
			<div className={classes.top}>
				<Grid container justify="center">
					<Grid item xs={editable ? 6 : 4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<Avatar data-test={`gym-name-${gymId}`}>
							<Tooltip disableFocusListener arrow enterTouchDelay={5} title={gymName}>
								<span>{gymId}</span>
							</Tooltip>
						</Avatar>
					</Grid>
					{
						editable ?
							<>
								<Grid item xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
									<IconButton aria-label="decrementPass" data-test={`decrement-pass-${gymId}`} onClick={() => changePass(gymId, -1)}>
										<RemoveIcon className={classes.icons} />
									</IconButton>
								</Grid>
								<Grid item xs={2} style={{ display: 'grid', alignItems: 'center', justifyContent: 'center', width: '2rem' }}>
									<span style={getTextStyle()} data-test={`passes-${gymId}`} >{numberOfPasses}</span>
								</Grid>
								<Grid item xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
									<IconButton aria-label="incrementPass" data-test={`increment-pass-${gymId}`} onClick={() => changePass(gymId, 1)}>
										<AddIcon className={classes.icons} />
									</IconButton>
								</Grid>
							</>
							:
							<Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								<span style={getTextStyle()} data-test={`passes-${gymId}`} >{numberOfPasses}</span>
							</Grid>
					}
					{/* <Grid item xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
									<IconButton aria-label="buyPasses" onClick={() => openGymLink(gymLink)} className={classes.buyButton} variant="contained">
										<span style={{ fontSize: 8 }} data-test={`gym-link-${gymId}`}>Buy</span> &nbsp; <CallMadeIcon style={{ fontSize: 8 }} />
									</IconButton>
								</Grid> */}
				</Grid>
			</div>
		</ListItem >
	)
}

GymTile.propTypes = {
	numberOfPasses: PropTypes.number.isRequired,
	passDifference: PropTypes.number.isRequired,
	gymId: PropTypes.string.isRequired,
	gymLink: PropTypes.string.isRequired,
	gymName: PropTypes.string.isRequired,
	editable: PropTypes.bool.isRequired,
	setPassesFunction: PropTypes.func.isRequired
}

export default GymTile
