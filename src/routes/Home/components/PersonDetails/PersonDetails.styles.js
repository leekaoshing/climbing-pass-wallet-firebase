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
    marginTop: '0.5rem',
    textAlign: 'center'
  },
  gymsContent: {
    minHeight: '150px',
  }
})
