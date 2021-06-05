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

const Main = () => {
    const { auth } = useContext(GlobalState);
    const [user, setUser] = auth;

    useEffect(() => {
        const jwtToken = window.localStorage.getItem('token');
        const spotifyToken = window.localStorage.getItem('spotify_token');
        const getUserData = async () => {
            if (jwtToken) {
                const response = await axios.get('/api/auth', {
                    headers: {
                        authorization: jwtToken,
                    },
                });
                const userData = response.data;
                console.log('MAIN:', userData);
                if (userData.id) {
                    setUser(userData);
                }
            } /*

            THIS MAY NOT BE NEEDED BECAUSE WE ARE GOING TO TRY TO CREATE/FIND A SPOTIFTY USER IN THE BACKEND

                    else if (spotifyToken) {
                // NOTE: axios request is formatted differently to fulfill OAuth 2.0 bearer token requirements
                const response = await axios.get(
                    'https://api.spotify.com/v1/me',
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyToken}`,
                        },
                    }
                );
                const userData = response.data;
                console.log('MAIN:', userData);
                if (userData.id) {
                    // grab email and make a call to backend
                    const { email, id } = userData;
                    //const response = await axios.post()
                    setUser(userData);
                }
            }*/
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
