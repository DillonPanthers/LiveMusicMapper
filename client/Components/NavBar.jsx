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

import Filter from './FilterMap';

import { GlobalState } from '../contexts/Store';

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
    const { auth } = useContext(GlobalState);
    const [user, setUser] = auth;

    const logOut = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('spotify_token');
        setUser({});
    };

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h4" className={classes.title}>
                        <Link to="/" className={classes.link}>
                            Live Music Mapper
                        </Link>
                    </Typography>
                    <Filter />
                    {location.pathname !== '/map' && (
                        <Button className={classes.button}>
                            <Link to="/map" className={classes.link}>
                                View&nbsp;Map
                            </Link>
                        </Button>
                    )}
                    {!user.id && (
                        <>
                            <Button className={classes.button}>
                                <Link to="/login" className={classes.link}>
                                    Log&nbsp;in
                                </Link>
                            </Button>
                            <Button className={classes.button}>
                                Sign&nbsp;up
                            </Button>
                        </>
                    )}
                    {user.id && (
                        <>
                        <Link to = '/friends'>
                        <PeopleAltTwoToneIcon style = {{fill:"red"}}/>
                        </Link>
                            <Button className={classes.button}>
                                <Link to="/dashboard" className={classes.link}>
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
    );
};

export default NavBar;
