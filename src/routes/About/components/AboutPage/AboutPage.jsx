import { Button, Grid, Link, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import styles from './AboutPage.styles'
import { HOME_PATH, LOGIN_PATH, SIGNUP_PATH } from 'constants/paths'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import homePageGuideUrl from '../../../../static/Home Page Guide.png'

const useStyles = makeStyles(styles)
const textVariant = 'body2'

function AboutPage() {
	const classes = useStyles()
	const history = useHistory()

	const auth = useSelector(state => state.firebase.auth)

	return (
		<Grid container className={classes.root} justify="center">
			<Grid item xs={10} md={8} lg={6} className={classes.gridItem}>
				<Paper className={classes.pane}>
					<Typography variant={textVariant} gutterBottom>
						Welcome to the <b>Climbing Pass Wallet</b>! This is a just-for-fun, community-driven project for climbers to keep track of their multipasses.
                    No more calling up gyms or logging into different websites to check your remaining passes :)
         			</Typography>
					<br />
					<Typography variant={textVariant} gutterBottom>
						Currently, this wallet will require <b>manual recording of passes</b>. Simply create an account (or log in), and add or subtract passes as you buy more passes or visit gyms.
						You can also add friends and view their passes.
          			</Typography>
					
					<img
						className={classes.guidePhoto}
						src={homePageGuideUrl}
						alt=""
						data-test="image-guide"
					/>
					<br />
					<br />
					<Typography variant={textVariant} gutterBottom>
						If there is sufficient community adoption, our next step would be to approach the various gyms for links to their databases so the passes are automatically updated. <b>Do
                        share this site with your friends</b> to help out!
          			</Typography>
					<br />
					<Typography variant={textVariant} gutterBottom data-test="email-enquiries-paragraph">
						For enquiries, please email <a href="mailto: climbingpasswallet@gmail.com">climbingpasswallet@gmail.com</a>. Happy sending!
         			</Typography>

					<div className={classes.signup}>
						{
							auth.isEmpty ?
								<div className={classes.buttonsGroup}>
									<Button variant="contained" color="primary" className={classes.buttons} onClick={() => history.push(LOGIN_PATH)} data-test="log-in-button">
										Log In
                					</Button>
									<Button variant="contained" color="primary" className={classes.buttons} onClick={() => history.push(SIGNUP_PATH)} data-test="sign-up-button">
										Sign Up
                					</Button>
								</div>
								:
								<div className={classes.buttonsGroup}>
									<Button variant="contained" color="primary" className={classes.buttons} onClick={() => history.push(HOME_PATH)} data-test="home-button">
										Home
                					</Button>
								</div>
						}

					</div>
				</Paper>
			</Grid>
		</Grid>
	)
}

export default AboutPage
