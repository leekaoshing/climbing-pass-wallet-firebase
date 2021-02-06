export default theme => ({
  root: {
    ...theme.flexColumnCenter,
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
    fontWeight: 400,
    paddingTop: '1.5rem'
  },
  panel: {
    ...theme.flexColumnCenter,
    justifyContent: 'center',
    flexGrow: 1,
    marginTop: 0,
    padding: '1.25rem',
    minWidth: '250px',
    minHeight: '170px'
  },
  loginLink: {
    marginTop: '1rem',
    fontSize: '1.2rem'
  },
})
