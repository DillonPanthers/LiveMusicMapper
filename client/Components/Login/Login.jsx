import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
    Button,
    Typography,
    Grid,
    Card,
    makeStyles,
    CardContent,
    CardActions,
} from '@material-ui/core';

import Background from '../AnimatedBackground/Background';
import EmailSignIn from './EmailSignIn';

import { GlobalState } from '../../contexts/Store';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        zIndex: '1000',
        maxWidth: '50%',
        minWidth: '25%',
        minHeight: '10vh',
        display: 'flex',
        fontWeight: '100',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '100px',
        borderRadius: '5px',
        backgroundColor: 'rgba(0,10,60,0.75)',
    },
    button: {
        color: 'black',
        background: '#1DE9B6',
        margin: theme.spacing(3),
        '&:hover': {
            background: '#5F285A',
            color: 'white',
        },
        borderRadius: 50,
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    },
    divider: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
    },
}));

const Login = () => {
    const classes = useStyles();

    const { auth } = useContext(GlobalState);
    const [user] = auth;

    return (
        <>
            <Grid className={classes.root}>
                <Card className={classes.card} variant="outlined">
                    <Typography variant="h4">Welcome Back</Typography>

                    <CardActions>
                        <a href="/api/spotify/login" className={classes.link}>
                            <Button className={classes.button}>
                                Log In With Spotify
                            </Button>
                        </a>
                    </CardActions>
                    <div className={classes.divider}>
                        <p>or</p>
                    </div>
                    <EmailSignIn />
                </Card>
            </Grid>
            <Background />
            {/* {user.id && <Redirect to="/dashboard" />} */}
        </>
    );
};

export default Login;
