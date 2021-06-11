import React, { useContext, useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './NavBar';
import LandingPage from './LandingPage/LandingPage.jsx';
import Map from './Map';
import Auth from './Login/Auth';
import Dashboard from './Dashboard';
import SingleConcert from './Concerts/SingleConcert';
import Login from './Login/Login';
import SingleVenue from './Venues/SingleVenue';
import SingleUser from './User/SingleUser';
import FriendRequests from './User/FriendRequests';
import Search from './User/Search';
import AllFriends from './User/AllFriends'

import { GlobalState } from '../contexts/Store';

const Main = () => {
    const { getUserData } = useContext(GlobalState);

    useEffect(() => {
        getUserData();
        console.log("main running")
    }, []);

    return (
        <div>
            <Router>
                <NavBar />
                <Switch>
                    <Route exact component={LandingPage} path="/" />
                    <Route exact component={Map} path="/map" />
                    <Route exact component={Auth} path="/auth/:token" />
                    <Route exact component={Dashboard} path="/dashboard" />
                    <Route exact component={Login} path="/login" />
                    <Route exact component={SingleVenue} path="/venue/:id" />
                    <Route exact component={SingleUser} path="/user/:id" />
                    <Route exact component={Search} path="/search" />
                    <Route exact component={AllFriends} path="/friends" />
                    <Route
                        exact
                        component={FriendRequests}
                        path="/friends/requests"
                    />
                    <Route
                        exact
                        component={SingleConcert}
                        path="/concert/:id"
                    />
                </Switch>
            </Router>
        </div>
    );
};

export default Main;
