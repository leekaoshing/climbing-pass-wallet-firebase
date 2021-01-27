import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import LoginRoute from './Login'
import SignupRoute from './Signup'
import AccountRoute from './Account'
import AboutRoute from './About'
import ResetPasswordRoute from './ResetPassword'

export default function createRoutes() {
  return (
    <CoreLayout>
        <Switch>
          {
            /* Build Route components from routeSettings */
            [
              Home,
              AccountRoute,
              SignupRoute,
              LoginRoute,
              AboutRoute,
              ResetPasswordRoute
              /* Add More Routes Here */
            ].map((settings) => (
              <Route exact key={`Route-${settings.path}`} {...settings} />
            ))
          }
          <Redirect from="*" to="/home" />
        </Switch>
    </CoreLayout>
  )
}
