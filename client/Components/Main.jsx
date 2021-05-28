import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './NavBar';
import LandingPage from './LandingPage/LandingPage.jsx';
import Map from './Map';
import Auth from './Auth';
import Dashboard from './Dashboard';

const Main = () => (
  <div>
    <Router>
      <NavBar />
      <Switch>
        <Route component={LandingPage} path="/" exact />
        <Route component={Map} path="/map" exact />
        <Route exact component={Auth} path="/auth/:token" />
        <Route exact component={Dashboard} path="/dashboard" />
      </Switch>
    </Router>
  </div>
);

export default Main;
