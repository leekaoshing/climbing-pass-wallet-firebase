export default (theme) => ({
  root: {
    ...theme.flexColumnCenter,
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
    fontWeight: 400,
  },
  panel: {
    ...theme.flexColumnCenter,
    justifyContent: 'center',
    flexGrow: 1,
    padding: '1.25rem',
    minWidth: '250px',
    minHeight: '270px'
  },
  orLabel: {
    marginTop: '1rem',
    marginBottom: '.5rem'
  },
  login: {
    ...theme.flexColumnCenter,
    justifyContent: 'center',
    marginTop: '1.5rem'
  },
  loginLabel: {
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  loginLink: {
    fontSize: '1.2rem'
  },
  about: {
    ...theme.flexColumnCenter,
    justifyContent: 'center',
    marginTop: '1.5rem'
  },
  aboutLabel: {
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  aboutLink: {
    fontSize: '1.2rem'
  },
  providers: {
    marginTop: '0.25rem'
  }
})
