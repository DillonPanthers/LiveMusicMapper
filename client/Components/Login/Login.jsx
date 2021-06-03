import React from 'react';
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

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: '100vw',
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        zIndex: '1000',
        maxWidth: '50%',
        minHeight: '10vh',
        display: 'flex',
        fontWeight: '100',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '5%',
        borderRadius: '2.5%',
        backgroundColor: 'rgba(0,10,60,0.75)',
    },
    button: {
        color: 'black',
        background: '#1DE9B6',
        '&:hover': {
            background: '#5F285A',
            color: 'white',
        },
        borderRadius: 50,
        width: '100%',
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
    title: {
        paddingBottom: '8%',
    },
}));

const Login = () => {
    const classes = useStyles();

    return (
        <>
            <Grid className={classes.root}>
                <Card className={classes.card}>
                    <Typography variant="h4" className={classes.title}>
                        Welcome Back
                    </Typography>

                    <a href="/api/spotify/login" className={classes.link}>
                        <Button className={classes.button}>
                            LOG IN WITH SPOTIFY ACCOUNT
                        </Button>
                    </a>

                    <div className={classes.divider}>
                        <p>or</p>
                    </div>
                    <EmailSignIn />
                </Card>
            </Grid>
            <Background />
        </>
    );
};

export default Login;
