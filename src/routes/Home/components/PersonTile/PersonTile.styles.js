export default (theme) => ({
  root: {
    justifyContent: 'center',
    padding: theme.spacing(1),
    height: '100%',
    maxWidth: '200px'
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
  name: {
    textAlign: 'center',
    padding: theme.spacing(0.5)
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
  formActions: {
    ...theme.flexColumnCenter,
    marginTop: '0.5rem',
  },
  buttons: {
    marginTop: '1.5rem',
    width: '100px'
  },
  tiles: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '-webkit-flex-flow': 'row wrap'
  },
  noPasses: {
    marginTop: '0.5rem',
    textAlign: 'center'
  },
  cardActions: {
    // padding: theme.spacing(0.2),
    display: 'flex',
    alignSelf: 'flex-end',
  },
})
