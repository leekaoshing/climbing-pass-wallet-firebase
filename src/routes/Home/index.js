import { loadable } from 'utils/router'
import HomePage from './components/HomePage'
import { HOME_PATH as path } from 'constants/paths'


// Sync route definition
export default {
  path,
  // component: HomePage
  component: loadable(() =>
    import(/* webpackChunkName: 'Login' */ './components/HomePage')
  )
}
