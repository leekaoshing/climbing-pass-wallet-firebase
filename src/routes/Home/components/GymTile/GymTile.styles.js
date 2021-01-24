import { blue } from '@material-ui/core/colors'

export default (theme) => ({
  root: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'flex-start',
    // height: '200px',
    width: '500px',
    // margin: theme.spacing(0.5),
    // padding: theme.spacing(1.3)
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '100px'
  },
  name: {
    fontSize: '1.5rem',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 800ms cubic-bezier(0.25,0.1,0.25,1) 0ms',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    '&:hover': {
      color: ''
    },
    '&:visited': {
      textDecoration: 'none'
    }
  },
  icons: {
    fontSize: 'small'
  },
  buyButton: {
    color: blue[600]
  }
})