export default theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    overflowY: 'scroll'
  },
  gridItem: {
    textAlign: 'left',
    marginTop: theme.spacing(0)
  },
  pane: {
    justifyContent: 'space-around',
    padding: theme.spacing(3),
    elevation: 0
  },
  signup: {
    ...theme.flexColumnCenter,
    justifyContent: 'center',
  },
  signupButton: {
    fontSize: '1.2rem'
  },
})
