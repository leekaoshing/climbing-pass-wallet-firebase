export default theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    // overflowY: 'scroll'
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
  buttonsGroup: {
    width: '100%',
    display: 'flex',
    marginTop: theme.spacing(2.5),
    justifyContent: 'space-evenly'
  },
  buttons: {
    fontSize: '1.0rem',
  },
  guidePhoto: {
    width: '100%',
    maxWidth: '130rem',
    marginTop: '1rem',
    marginBottom: '0.5rem',
    height: 'auto',
    cursor: 'pointer'
  },
})
