import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './NavBar';
import LandingPage from './LandingPage/LandingPage.jsx';
import Map from './Map';
import Event from "./Events/Event"

class Main extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Switch>
            <Route component={LandingPage} path="/" exact />
            <Route component={Map} path="/map" exact />
            <Route component={Event} path="/event" exact/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Main;
