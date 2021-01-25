import { blue } from '@material-ui/core/colors'

export default (theme) => ({
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '100px',
    // width: '150px'
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
