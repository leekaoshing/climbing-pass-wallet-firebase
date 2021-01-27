export default (theme) => ({
  root: {
    // ...theme.flexColumnCenter,
    padding: theme.spacing(0),
    flexGrow: '2',
    display: 'flex',
    justifyContent: 'center'
  },
  gridItem: {
    textAlign: 'center',
    padding: theme.spacing(0),
    flexGrow: 2,
    // marginTop: theme.spacing(2)
  },
  users: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  search: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0.5)
  },
  searchBox: {
    width: '70%',
    padding: theme.spacing(0.5)
  },
  buttons: {
    marginTop: theme.spacing(0.2),
    justifyContent: 'center',
    // padding: theme.spacing(0.5),
    display: 'flex'
  },
  iconButton: {
    justifyContent: 'space-between'
    // marginTop: '6px',
    // marginRight: theme.spacing(1),
    // padding: theme.spacing(0.5),
  }
})
