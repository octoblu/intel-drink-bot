import React from 'react'
import { IndexRedirect, IndexRoute, Route, Router } from 'react-router'

import { createHistory } from 'history'

import Face from '../containers/face'
import Hub from '../containers/hub'
import Layout from '../containers/layout'
import Orders from '../containers/orders'
  

const Routes = (
  <Router history={createHistory()}>
    <Route path="/" component={Layout}>
      <IndexRedirect to="hub" />
      <Route path="/face" component={Face} />
      <Route path="/orders" component={Orders} />
      <Route path="/hub" component={Hub} />
    </Route>
  </Router>
)

export default Routes
