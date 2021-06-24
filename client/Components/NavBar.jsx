import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    makeStyles,
    AppBar,
    Toolbar,
    Typography,
    Button,
} from '@material-ui/core';

import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';

import { GlobalState } from '../contexts/Store';
import { socket } from '../contexts/SocketContext';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#000A47',
        position: 'sticky',
        zIndex: '1000',
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    },
    button: {
        color: 'white',
    },
}));

// TODO: ADD LINKS TO TITLE & BUTTONS
const NavBar = (props) => {
    const location = useLocation();
    const classes = useStyles();
    const { auth, newNotification, personalization, mapViews, genres } =
        useContext(GlobalState);

    const [user, setUser] = auth;
    const [notification, setNotification] = newNotification;
    const [personalized, setPersonalized] = personalization;
    const [mapView, setMapView] = mapViews;
    const [genre, setGenre] = genres;

    const logOut = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('spotify_token');
        setUser({});
        setPersonalized(false);
        setMapView('');
        setGenre('');
    };

    useEffect(() => {
        if (location.pathname !== '/friends') {
            setNotification(false);
        }
        socket.on('newFriendRequest', (userId) => {
            setNotification(true);
        });

        socket.on('acceptedRequest', () => {
            setNotification(true);
        });
    }, [location.pathname]);

    return (
        <>
            <div className={classes.root}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h4" className={classes.title}>
                            <Link to="/" className={classes.link}>
                                Live&nbsp;Music&nbsp;Mapper
                            </Link>
                        </Typography>
                        {location.pathname !== '/map' && (
                            <Link to="/map" className={classes.link}>
                                <Button className={classes.button}>
                                    View&nbsp;Map
                                </Button>
                            </Link>
                        )}
                        {!user.id && (
                            <>
                                <Link to="/login" className={classes.link}>
                                    <Button className={classes.button}>
                                        Log&nbsp;in
                                    </Button>
                                </Link>
                                <Link to="/signup" className={classes.link}>
                                    <Button className={classes.button}>
                                        Sign&nbsp;up
                                    </Button>
                                </Link>
                            </>
                        )}
                        {user.id && (
                            <>
                                <Link
                                    to="/friends"
                                    onClick={() => {
                                        setNotification(false);
                                    }}
                                >
                                    {notification ? (
                                        <PeopleAltTwoToneIcon color="primary" />
                                    ) : (
                                        <PeopleAltTwoToneIcon
                                            style={{ color: 'gray' }}
                                        />
                                    )}
                                </Link>
                                <Button className={classes.button}>
                                    <Link
                                        to="/dashboard"
                                        className={classes.link}
                                    >
                                        Hello, {user.firstName}
                                    </Link>
                                </Button>
                                <Button className={classes.button}>
                                    <Link
                                        to="/"
                                        className={classes.link}
                                        onClick={logOut}
                                    >
                                        Log Out
                                    </Link>
                                </Button>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        </>
    );
};

export default NavBar;
