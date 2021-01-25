export default (theme) => ({
  root: {
    justifyContent: 'center',
    padding: theme.spacing(0),
    height: '100%',
  },
  card: {
    ...theme.flexColumnCenter,
    position: 'relative',
    display: 'flex',
    // paddingTop: theme.spacing(0.5),
    flexGrow: '2',
    margin: theme.spacing(0.5),
    height: '100%',
    flex: 1
    // boxSizing: 'border-box',
    // overflowY: 'scroll'
  },
    email: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
    padding: theme.spacing(0)
  },
  filler: {
    width: '100%',
    height: '100%'
  },
  content: {
    padding: theme.spacing(0)
  },
  textContent: {
    textAlign: 'center',
    padding: theme.spacing(2)
  },
  cardActions: {
    // padding: theme.spacing(0.2),
    display: 'flex',
    alignSelf: 'flex-end',
  },
})
