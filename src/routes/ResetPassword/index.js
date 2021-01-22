import { loadable } from 'utils/router'
import { RESET_PATH as path } from 'constants/paths'

export default {
  path,
  component: loadable(() =>
    import(/* webpackChunkName: 'resetPassword' */ './components/ResetPasswordPage'),
  ),
}
