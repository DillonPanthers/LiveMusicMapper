import React, { useContext, useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import NavBar from './NavBar';
import LandingPage from './LandingPage/LandingPage.jsx';
import Map from './Map';
import Auth from './Login/Auth';
import Dashboard from './Dashboard';
import SingleConcert from './Concerts/SingleConcert';
import Login from './Login/Login';
import SingleVenue from './Venues/SingleVenue';

import { GlobalState } from '../contexts/Store';

// TODO: find out why regular login does not save on hard refresh
const Main = () => {
    const { auth } = useContext(GlobalState);
    const [user, setUser] = auth;

    useEffect(() => {
        const jwtToken = window.localStorage.getItem('token');
        const spotifyToken = window.localStorage.getItem('spotify_token');
        const getUserData = async () => {
            if (jwtToken) {
                let response;
                if (spotifyToken) {
                    response = await axios.get('/api/auth', {
                        headers: {
                            authorization: jwtToken,
                            spotify: true,
                        },
                    });
                } else {
                    response = await axios.get('/api/auth', {
                        headers: {
                            authorization: jwtToken,
                            spotify: false,
                        },
                    });
                }
                const userData = response.data;
                if (userData.id) {
                    setUser(userData);
                }
            }
        };
        getUserData();
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
                    <Route
                        exact
                        component={SingleConcert}
                        path="/concert/:id"
                    />
                    <Route exact component={SingleVenue} path="/venue/:id" />
                    <Route exact component={Login} path="/login" />
                </Switch>
            </Router>
        </div>
    );
};

export default Main;
