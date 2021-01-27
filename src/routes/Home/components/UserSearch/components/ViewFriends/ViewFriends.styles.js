export default (theme) => ({
  // root: {
  //   padding: theme.spacing(2)
  // },
  // inputs: {
  //   ...theme.flexColumnCenter
  // },
  // buttons: {
  //   ...theme.flexColumnCenter
  // }
  root: {
    display: 'flex',
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  iconButton: {
    justifyContent: 'space-between'
  }
})
