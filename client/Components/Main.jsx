import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './NavBar';
import LandingPage from './LandingPage/LandingPage.jsx';
import Map from './Map';
import Auth from './Auth';
import Dashboard from './Dashboard';
import Event from './Events/Event';
import Login from './Login';

const Main = () => (
    <div>
        <Router>
            <NavBar />
            <Switch>
                <Route exact component={LandingPage} path="/" />
                <Route exact component={Map} path="/map" />
                <Route exact component={Auth} path="/auth/:token" />
                <Route exact component={Dashboard} path="/dashboard" />
                <Route exact component={Event} path="/event" />
                <Route exact component={Login} path="/login" />
            </Switch>
        </Router>
    </div>
);

export default Main;
