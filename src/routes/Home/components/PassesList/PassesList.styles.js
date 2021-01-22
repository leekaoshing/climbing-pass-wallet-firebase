export default (theme) => ({
  root: {
    ...theme.flexColumnCenter,
    paddingTop: theme.spacing(0.5),
    flexGrow: '2',
    // boxSizing: 'border-box',
    // overflowY: 'scroll'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
  },
  formActions: {
    ...theme.flexColumnCenter,
    marginTop: '1rem',
    marginBottom: '.5rem'
  },
  tiles: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '-webkit-flex-flow': 'row wrap'
  },
  noPasses: {
    marginTop: '1rem'
  }
})
