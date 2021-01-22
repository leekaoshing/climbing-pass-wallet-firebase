import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import PassesList from '../PassesList'
import UpdateResultDialog from '../UpdateResultDialog'
import styles from './HomePage.styles'

const useStyles = makeStyles(styles)

function Home() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <PassesList />
      <UpdateResultDialog />
    </div>
  )
}

export default Home
