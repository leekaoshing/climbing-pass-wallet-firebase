export default (theme) => ({
  name: {
    textAlign: 'center',
    padding: theme.spacing(0.5)
  },
  content: {
    ...theme.flexColumnCenter,
    padding: theme.spacing(0),
  },
  formActions: {
    ...theme.flexColumnCenter,
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%'
  },
  noPasses: {
    textAlign: 'center',
    padding: theme.spacing(2)
  },
  gymsContent: {
    minHeight: '150px',
    maxHeight: '230px',
    overflowY: 'auto'
  }
})
