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
import ConcertCard from './Card/ConcertCard'

import { GlobalState } from '../contexts/Store';

const Main = () => {
    const { auth } = useContext(GlobalState);
    const [user, setUser] = auth;
    
    useEffect(() => {
        const token = window.localStorage.getItem('token');
        const getUserData = async () => {
            if (token) {
                const response = await axios.get('/api/auth', {
                    headers: {
                        authorization: token,
                    },
                });
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
                    <Route exact component = {SingleVenue} path = "/venue/:id"/>
                    <Route exact component={Login} path="/login" />
                </Switch>
            </Router>
            {/* <ConcertCard/> */}
        </div>
    );
};

export default Main;
