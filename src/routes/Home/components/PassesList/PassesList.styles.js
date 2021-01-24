export default (theme) => ({
  root: {
    ...theme.flexColumnCenter,
    paddingTop: theme.spacing(0.5),
    width: '100%',
    // flexGrow: '2',
    // marginTop: '1rem'
    // boxSizing: 'border-box',
    // overflowY: 'scroll'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
  },
  gridItem: {
    // display: 'flex',
    justifyContent: 'center',
    // flexWrap: 'wrap',
    // '-webkit-flex-flow': 'row wrap'
  }
})
