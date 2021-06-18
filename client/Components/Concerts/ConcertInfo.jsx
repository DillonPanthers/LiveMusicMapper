import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CssBaseline, Typography, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';
import MuiButton from '@material-ui/core/Button';
import axios from 'axios';

import { GlobalState } from '../../contexts/Store';
import concertBackground from '../../../public/concertBackground.png';
import ArtistTracks from './ArtistTracks';
import ConcertFriends from './ConcertFriends';
import ContainedButton from '../StyledComponents/ContainedButton';

const Button = styled(MuiButton)(spacing);

const useStyles = makeStyles((theme) => ({
    CardActionArea: {
        display: 'flex',
        backgroundColor: 'white',
        color: 'black',
    },
    CardContent: {
        color: 'black',
        width: 160,
        height: 160,
    },
    paperContainer: {
        backgroundImage: `url(${concertBackground})`,
    },
    mainFeaturedPostContent: {
        position: 'relative',
        height: 500,
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
    leftBox: {
        backgroundColor: 'black',
        height: '300px',
        padding: '30px',
    },
    rightBox: {},
    button: {
        margin: theme.spacing(1),
        borderRadius: '5em',
    },
    spotifyFrame: {
        height: '400px',
        margin: '20px',
    },

    detailsElement: {
        backgroundColor: '#311b92',
        height: '400px',
        margin: '20px',
        direction: 'row',
        justify: 'center',
        alignItems: 'center',
        overflow: 'scroll',
        padding: '20px',
    },
    mainGrid: {
        direction: 'row',
        justify: 'center',
        alignItems: 'center',
        paddingLeft: '100px',
    },

    buttonContainer: {
        display: 'flex',
        height: '400px',
        justifyContent: 'center',
        alignItems: 'center',
    },

    links: {
        textDecoration: 'none',
    },
}));

export default function ConcertInfo({ single_concert, artistName }) {
    const { getUserData, auth } = useContext(GlobalState);
    const [user, setUser] = auth;
    const [isAttending, setIsAttending] = useState(false);

    const [count, setCount] = useState(true);

    useEffect(() => {
        const checkIfAttending = () => {
            return user.concerts.some(
                (concert) => concert.id === single_concert.id
            );
        };
        if (user.id && single_concert.id) {
            setIsAttending(checkIfAttending());
        }
    }, []);

    const convertTime = (time) => {
        time = time.split(':');

        var hours = Number(time[0]);
        var minutes = Number(time[1]);
        var seconds = Number(time[2]);

        var timeValue;

        if (hours > 0 && hours <= 12) {
            timeValue = '' + hours;
        } else if (hours > 12) {
            timeValue = '' + (hours - 12);
        } else if (hours == 0) {
            timeValue = '12';
        }

        timeValue += minutes < 10 ? ':0' + minutes : ':' + minutes;
        timeValue += hours >= 12 ? ' P.M.' : ' A.M.';
        return timeValue;
    };

    const addConcert = async (concert) => {
        const userId = user.id;
        await axios.post('/api/user/concert', { userId, concert });
        setIsAttending(true);
        await getUserData();
    };

    const removeConcert = async (concertId) => {
        const userId = user.id;
        await axios.delete('/api/user/concert', {
            data: { userId, concertId },
        });
        setIsAttending(false);
        await getUserData();
    };

    const getWorkingImage = (imageArr) => {
        let workingImages = [];
        for (let image of imageArr) {
            if (image.ratio === '3_2') return image.url;
        }
    };

    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <main>
                <div display="flex">
                    `{' '}
                    <Grid container>
                        <Grid item md={8} className={classes.leftBox}>
                            <Container>
                                <Typography
                                    variant="h3"
                                    color="textPrimary"
                                    gutterBottom
                                    bgcolor="text.primary"
                                >
                                    {single_concert.name}
                                </Typography>
                                {single_concert.dates ? (
                                    <Typography
                                        variant="h5"
                                        color="textPrimary"
                                        gutterBottom
                                        bgcolor="text.primary"
                                    >
                                        {single_concert.dates.start.localDate}
                                    </Typography>
                                ) : null}
                                {single_concert.url ? (
                                    <Button
                                        margin="30px"
                                        variant="contained"
                                        color="primary"
                                    >
                                        <a href={single_concert.url}>
                                            View Seats
                                        </a>
                                    </Button>
                                ) : null}
                                {!isAttending ? (
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() =>
                                            addConcert(single_concert)
                                        }
                                    >
                                        I'm Attending
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() =>
                                            removeConcert(single_concert.id)
                                        }
                                    >
                                        Remove Concert
                                    </Button>
                                )}
                            </Container>
                        </Grid>

                        {single_concert.images ? (
                            <Grid item md={4} className={classes.rightBox}>
                                <img
                                    height="300px"
                                    src={getWorkingImage(single_concert.images)}
                                />
                            </Grid>
                        ) : null}
                    </Grid>
                </div>
                <div>
                    <Grid container className={classes.mainGrid}>
                        <Grid item xs={3} className={classes.detailsElement}>
                            <Typography
                                variant="h4"
                                color="textPrimary"
                                gutterBottom
                                bgcolor="text.primary"
                            >
                                Venue Details
                            </Typography>
                            {single_concert._embedded ? (
                                <Typography
                                    variant="h6"
                                    color="textPrimary"
                                    gutterBottom
                                    bgcolor="text.primary"
                                >
                                    Venue:{' '}
                                    {single_concert._embedded.venues[0].name}
                                </Typography>
                            ) : null}
                            {single_concert.dates ? (
                                <Typography
                                    variant="h6"
                                    color="textPrimary"
                                    gutterBottom
                                    bgcolor="text.primary"
                                >
                                    Start Time:{' '}
                                    {convertTime(
                                        single_concert.dates.start.localTime
                                    )}
                                </Typography>
                            ) : null}
                        </Grid>
                        <Grid item xs={3} className={classes.detailsElement}>
                            <ConcertFriends concert={single_concert} />
                        </Grid>

                        {/*sSpotify Player*/}
                        <Grid item xs={3} className={classes.spotifyFrame}>
                            {user.spotifyId ? (
                                <ArtistTracks artistName={artistName} />
                            ) : (
                                <div className={classes.buttonContainer}>
                                    <Link to="/login" className={classes.links}>
                                        <ContainedButton>
                                            Login With Spotify For Artist
                                            Preview
                                        </ContainedButton>
                                    </Link>
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </div>
            </main>
        </>
    );
}
