import { Button, Grid, Link, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import styles from './AboutPage.styles'
import { SIGNUP_PATH } from 'constants/paths'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(styles)
const textVariant = 'body2'

function AboutPage() {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Grid container className={classes.root} justify="center">
      <Grid item xs={10} md={8} lg={6} className={classes.gridItem}>
        <Paper className={classes.pane}>
          <Typography variant={textVariant} gutterBottom>
            Welcome to the <b>Climbing Pass Wallet</b>! This is a just-for-fun, community-driven project for climbers to keep track of their existing multipasses.
                    No more calling up gyms or logging into different websites just to check your remaining passes :)
          </Typography>
          <br />
          <Typography variant={textVariant} gutterBottom>
            Currently, this wallet will require <b>manual recording of passes</b>. Simply create an account (or log in), and add or subtract passes as you buy more passes or visit gyms.
          </Typography>
          <br />
          <Typography variant={textVariant} gutterBottom>
            If there is sufficient community adoption, our next step would be to approach the various gyms for links to their databases so the passes are automatically updated. <b>Do
                        share this site with your friends</b> to help out!
          </Typography>
          <br />
          <Typography variant={textVariant} gutterBottom data-test="email-enquiries-paragraph">
            For enquiries, please email <a href="mailto: climbingpasswallet@gmail.com">climbingpasswallet@gmail.com</a>. Happy sending!
          </Typography>
          <br />
          <div className={classes.signup}>
          <Button variant="contained" color="primary" className={classes.signupButton} onClick={() => history.push(SIGNUP_PATH)} data-test="sign-up">
            Sign Up
          </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default AboutPage
