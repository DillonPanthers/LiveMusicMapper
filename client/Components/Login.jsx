import React, { useEffect, useState } from 'react';
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

const useStyles = makeStyles({
    root: {
        minWidth: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    card: {
        maxWidth: '50%',
        minWidth: '25%',
        minHeight: '20vh',
        display: 'flex',
        fontWeight: '100',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '100px',
        borderRadius: '5px',
        boxShadow: '20px 15px 20px -10px rgb(199,37,32)',
    },
});

function Login({ location }) {
    const classes = useStyles();

    return (
        <div id="log-in">
            <Grid className={classes.root} alignItems="center" justify="center">
                <Card className={classes.card} variant="outlined">
                    <CardContent>
                        <Typography variant="h2" color="secondary">
                            Explorify
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <a href="/api/spotify/login">
                            <Button variant="contained" color="primary">
                                Log In With Spotify
                            </Button>
                        </a>
                    </CardActions>
                </Card>
            </Grid>
        </div>
    );
}

export default Login;
