export default (theme) => ({
  root: {
    ...theme.flexColumnCenter,
    padding: theme.spacing(0),
    flexGrow: '2',
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
    width: '250px',
    padding: theme.spacing(0.5)
  },
  searchButton: {
    marginTop: '5px',
    justifyContent: 'center',
    padding: theme.spacing(0.5),
  },
})
