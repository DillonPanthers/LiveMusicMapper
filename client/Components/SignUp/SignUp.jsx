import React, { useState } from 'react';
import { Typography, Card, makeStyles, Icon } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { Link } from 'react-router-dom';

import Background from '../AnimatedBackground/Background';
import EmailSignUp from './EmailSignUp';
import ContainedButton from '../StyledComponents/ContainedButton';
import ContainedButtonSpotifyExperience from '../StyledComponents/ContainedButtonSpotifyExperience';
import HorizontalLine from '../StyledComponents/HorizontalLine';

// TODO: Nice to have - error message to prevent existing Spotify user from signing up
const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '2%',
    },
    card: {
        zIndex: '1000',
        width: '30rem',
        minHeight: '10vh',
        display: 'flex',
        fontWeight: '100',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2.5% 0',
        borderRadius: '2.5%',
        backgroundColor: 'rgba(0,10,60,0.75)',
        rowGap: '1rem',
    },
    link: {
        textDecoration: 'inherit',
        width: '24rem',
    },
    secondaryLink: {
        color: 'inherit',
    },
    icon: {
        width: '100%',
        verticalAlign: 'top',
    },
    errorContainer: {
        display: 'flex',
        marginBottom: '8%',
    },
    errorMsg: {
        justifyContent: 'center',
        border: '2px solid red',
        backgroundColor: 'white',
        alignItems: 'center',
        flex: 3,
    },
    error: {
        color: 'red',
        margin: '0.5rem',
        lineHeight: '1.15',
        alignSelf: 'center',
    },
    warningIcon: {
        color: 'white',
        alignSelf: 'center',
    },
    iconContainer: {
        backgroundColor: 'red',
        display: 'flex',
        padding: '0.5rem',
        width: '4rem',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '24rem',
    },
}));

const Signup = () => {
    const classes = useStyles();

    const [errorMsg, setErrorMsg] = useState('');

    const svgIcon = (
        <Icon>
            <img src="spotify.svg" className={classes.icon} />
        </Icon>
    );

    const signUpWithSpotify = () => {
        try {
            // TODO: Find a way to block an existing user from using logging in through the sign up button. Moved link here in case we find an efficient way to set up a conditional without creating another spotify api callback route
            const path =
                window.location.href.split('#')[0] + 'api/spotify/login';
            window.location.replace(path);
        } catch (error) {
            setErrorMsg(error.response.data.error);
            console.log(error);
        }
    };

    return (
        <>
            <div className={classes.root}>
                <Card className={classes.card}>
                    <Typography variant="h4">Hello, there!</Typography>
                    {errorMsg !== '' ? (
                        <div className={classes.errorContainer}>
                            <div className={classes.iconContainer}>
                                <WarningIcon className={classes.warningIcon} />
                            </div>
                            <div className={classes.errorMsg}>
                                <p className={classes.error}>{errorMsg}</p>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    <Link to="/spotifyguestexperience" className={classes.link}>
                        <ContainedButtonSpotifyExperience
                            startIcon={svgIcon}
                            className={classes.button}
                        >
                            PREVIEW SPOTIFY EXPERIENCE
                        </ContainedButtonSpotifyExperience>
                    </Link>
                    <ContainedButton
                        startIcon={svgIcon}
                        className={classes.link}
                        onClick={signUpWithSpotify}
                    >
                        SIGN UP WITH SPOTIFY ACCOUNT
                    </ContainedButton>
                    <HorizontalLine />
                    <EmailSignUp />
                    <Typography>
                        Already have an account?{' '}
                        <Link to="/login" className={classes.secondaryLink}>
                            <strong>LOG IN</strong>
                        </Link>
                    </Typography>
                </Card>
            </div>
            <Background />
        </>
    );
};

export default Signup;
