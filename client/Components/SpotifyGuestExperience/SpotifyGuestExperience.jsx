import React from 'react';
import { Typography, Grid, Card, makeStyles, Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment } from '@material-ui/icons';

import Background from '../AnimatedBackground/Background';
import OutlinedButtonCopyPaste from '../StyledComponents/OutlinedButtonCopyPaste';
import ContainedButtonSpotifyExperience from '../StyledComponents/ContainedButtonSpotifyExperience';

const email = 'spotifyguest2101@gmail.com';
const password = 'Spotifyguest2101#';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: '100vw',
        minHeight: '85vh',
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
        backgroundColor: 'rgba(15,15,15,0.85)',
        rowGap: '1.5rem',
    },
    typographyContainer: {
        rowGap: '0.75rem',
    },
    typography: {
        width: '20rem',
        margin: '0 2rem',
    },
    button: {
        width: '24rem',
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    },
    secondaryLink: {
        color: 'inherit',
    },
    icon: {
        width: '100%',
        verticalAlign: 'top',
    },
}));

const SpotifyGuestExperience = () => {
    const classes = useStyles();

    const svgIcon = (
        <Icon>
            <img src="spotify.svg" className={classes.icon} />
        </Icon>
    );

    return (
        <>
            <Grid className={classes.root}>
                <Card className={classes.card}>
                    <Typography variant="h4">So excited for you!</Typography>
                    <CopyToClipboard text={`${email} ${password}`}>
                        <OutlinedButtonCopyPaste
                            variant="outlined"
                            startIcon={<Assignment fontSize="large" />}
                            className={classes.button}
                        >
                            COPY EMAIL{' & '}PASSWORD*
                        </OutlinedButtonCopyPaste>
                    </CopyToClipboard>
                    <div className={classes.typographyContainer}>
                        <Typography className={classes.typography}>
                            <strong>EMAIL:&nbsp;</strong>
                            {email}
                        </Typography>
                        <Typography className={classes.typography}>
                            <strong>PASSWORD:&nbsp;</strong>
                            {password}
                        </Typography>
                    </div>
                    <Typography className={classes.typography}>
                        *Please mind the space when you paste the email and
                        password into the next page
                    </Typography>
                    <a href="/api/spotify/login" className={classes.link}>
                        <ContainedButtonSpotifyExperience
                            startIcon={svgIcon}
                            className={classes.button}
                        >
                            ACCESS WITH GUEST CREDENTIALS
                        </ContainedButtonSpotifyExperience>
                    </a>
                    <Typography>
                        Already have an account?{' '}
                        <Link to="/login" className={classes.secondaryLink}>
                            <strong>LOG IN</strong>
                        </Link>
                    </Typography>
                </Card>
            </Grid>
            <Background />
        </>
    );
};

export default SpotifyGuestExperience;
