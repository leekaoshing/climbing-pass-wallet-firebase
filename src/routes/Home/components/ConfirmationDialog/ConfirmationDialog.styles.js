export default (theme) => ({
  root: {
    padding: theme.spacing(2)
  },
  inputs: {
    ...theme.flexColumnCenter
  },
  buttons: {
    ...theme.flexColumnCenter,
    marginTop: '0.5rem',
    width: '100px'
  }
})
