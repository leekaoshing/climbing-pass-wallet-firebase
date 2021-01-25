export default (theme) => ({
  root: {
    ...theme.flexColumnCenter,
    paddingTop: theme.spacing(0.5),
    width: '100%'
  },
  gridItem: {
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
    padding: theme.spacing(3)
  }
})
