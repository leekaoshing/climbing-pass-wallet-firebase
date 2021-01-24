export default (theme) => ({
  root: {
    ...theme.flexColumnCenter,
    padding: theme.spacing(1.5),
    flexGrow: '2',
  },
  // paper: {
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  // },
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
    // flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    // minHeight: '100px',
    // margin: 0,
  },
  searchButton: {
    // display: 'flex',
    marginTop: '7px',
    justifyContent: 'center',
    // flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    // margin: 0,
  },
})
