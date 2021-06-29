import React, { useContext, useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './NavBar';
import LandingPage from './LandingPage/LandingPage.jsx';
import Map from './Map/Map';
import Auth from './Login/Auth';
import Dashboard from './Dashboard/Dashboard';
import SingleConcert from './Concerts/SingleConcert';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import SingleUser from './User/SingleUser';
import FriendRequests from './User/FriendRequests';
import Search from './User/Search';
import AllFriends from './User/AllFriends';
import UnauthorizedUser from './Error handling/UnauthorizedUser';
import About from './About/About';

import { GlobalState } from '../contexts/Store';
import { SocketContext } from '../contexts/SocketContext';

const Main = () => {
    const { auth, getUserData, grabGoogleInfo } = useContext(GlobalState);
    const { attachUserId, socketId } = useContext(SocketContext);

    const [user, setUser] = auth;
    useEffect(() => {
        getUserData();
        grabGoogleInfo();
        if (user.id && socketId) {
            attachUserId(user.id);
        }
    }, [user.id, socketId]);

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
                    <Route exact component={SignUp} path="/signup" />
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
                    <Route
                        exact
                        component={UnauthorizedUser}
                        path="/unauthorizeduser"
                    />
                    <Route exact component={About} path="/about" />
                </Switch>
            </Router>
        </div>
    );
};

export default Main;
