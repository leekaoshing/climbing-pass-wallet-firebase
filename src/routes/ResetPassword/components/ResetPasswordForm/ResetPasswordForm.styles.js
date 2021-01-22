export default (theme) => ({
  root: {
    ...theme.flexColumnCenter,
    justifyContent: 'flex-start',
    flexGrow: 1,
    height: '100%',
    width: '100%',
    margin: '.2rem',
    fontSize: '1.4rem'
  },
  submit: {
    ...theme.flexColumnCenter,
    justifyContent: 'center',
    flexGrow: 1,
    textAlign: 'center',
    padding: '0.5rem',
    minWidth: '192px',
    marginTop: '0.5rem'
  }
})
