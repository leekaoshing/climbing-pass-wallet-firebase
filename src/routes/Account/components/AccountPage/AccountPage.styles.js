export default (theme) => ({
  root: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(3),
    overflowY: 'scroll'
  },
  gridItem: {
    textAlign: 'center',
    marginTop: theme.spacing(2)
  },
  pane: {
    ...theme.flexColumnCenter,
    justifyContent: 'space-around',
    padding: theme.spacing(2)
  }
})
