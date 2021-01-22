import { loadable } from 'utils/router'
import { ABOUT_PATH as path } from 'constants/paths'

export default {
  path,
  component: loadable(() =>
    import(/* webpackChunkName: 'about' */ './components/AboutPage'),
  ),
}
