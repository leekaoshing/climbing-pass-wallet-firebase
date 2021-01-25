export default (theme) => ({
  root: {
    ...theme.flexColumnCenter,
    paddingTop: theme.spacing(1.5)
  },
  section: {
    ...theme.flexColumnCenter,
    padding: theme.spacing(2),
    textAlign: 'center'
  }
})
