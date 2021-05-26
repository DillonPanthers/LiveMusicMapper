import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './NavBar';
import LandingPage from './LandingPage/LandingPage.jsx';
import Map from './Map';

const Main = () => (
  <div>
    <Router>
      <NavBar />
      <Switch>
        <Route component={LandingPage} path="/" exact />
        <Route component={Map} path="/map" exact />
      </Switch>
    </Router>
  </div>
);

export default Main;
