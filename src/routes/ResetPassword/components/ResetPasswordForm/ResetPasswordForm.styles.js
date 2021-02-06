export default (theme) => ({
  // root: {
  //   ...theme.flexColumnCenter,
  //   justifyContent: 'flex-start',
  //   flexGrow: 1,
  //   height: '100%',
  //   width: '100%',
  //   margin: '.2rem',
  //   fontSize: '1.4rem'
  // },
  panel: {
    ...theme.flexColumnCenter,
    justifyContent: 'center',
    flexGrow: 1,
    padding: '1.25rem',
    minWidth: '250px',
    minHeight: '270px'
  },
  submit: {
    ...theme.flexColumnCenter,
    justifyContent: 'center',
    flexGrow: 1,
    textAlign: 'center',
    padding: '0.5rem',
    minWidth: '192px',
    marginTop: '0.5rem'
  },
  loginLink: {
    fontSize: '1.2rem'
  },
})
