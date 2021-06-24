import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, makeStyles, Icon } from '@material-ui/core';
import axios from 'axios';

import { GlobalState } from '../../contexts/Store';
import ArtistTracks from './ArtistTracks';
import ConcertFriends from './ConcertFriends';
import ContainedButton from '../StyledComponents/ContainedButton';
import OutlinedButton from '../StyledComponents/OutlinedButton';

import { convertTime, getWorkingImage } from './utils';
import { getDateInStringFormat } from '../Card/utils';

const useStyles = makeStyles((theme) => ({
    upperContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftBox: {
        flexGrow: 3,
        backgroundColor: 'black',
        height: '18rem',
        padding: '1.5rem',
    },
    rightBox: {
        flexGrow: 1,
        height: '18rem',
        objectFit: 'cover',
        verticalAlign: 'text-top',
    },
    spotifyFrame: {
        minHeight: '25rem',
        margin: '1.5rem 0.75rem 1.5rem 0.75rem',
        alignSelf: 'flex-start',
    },
    detailsElement: {
        flex: '3',
        backgroundColor: '#311b92',
        minHeight: '25rem',
        margin: '1.5rem 0.75rem 1.5rem 0.75rem',
        padding: '1.5rem',
        alignSelf: 'flex-start',
    },
    container: {
        display: 'flex',
        justify: 'center',
        alignItems: 'center',
        margin: '0rem 0.75rem 0rem 0.75rem',
    },
    link: {
        textDecoration: 'inherit',
        color: 'inherit',
    },
    outlinedButton: {
        margin: '1rem',
        width: '12rem',
    },
    containedButton: {
        width: '12rem',
    },
    spotifyButton: {
        width: '18rem',
        height: '3.5rem',
    },
    icon: {
        width: '100%',
        verticalAlign: 'top',
    },
    note: {
        paddingTop: '2rem',
    },
}));

export default function ConcertInfo({ single_concert, artistName }) {
    const { getUserData, auth } = useContext(GlobalState);
    const [user, setUser] = auth;
    const [isAttending, setIsAttending] = useState(false);

    useEffect(() => {
        const checkIfAttending = () => {
            return user.concerts.some(
                (concert) => concert.id === single_concert.id
            );
        };
        if (user.id && single_concert.id) {
            setIsAttending(checkIfAttending());
        }
    }, [single_concert.id, user.id]);

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

    const classes = useStyles();

    const svgIcon = (
        <Icon>
            <img src="spotify.svg" className={classes.icon} />
        </Icon>
    );

    return (
        <>
            <div className={classes.upperContainer}>
                <div className={classes.leftBox}>
                    <Typography variant="h4" gutterBottom>
                        {single_concert.name}
                    </Typography>
                    {single_concert.dates ? (
                        <Typography variant="h5" gutterBottom>
                            {getDateInStringFormat(
                                single_concert.dates.start.localDate
                            )}
                        </Typography>
                    ) : null}
                    {single_concert.url ? (
                        <a className={classes.link} href={single_concert.url}>
                            <ContainedButton
                                className={classes.containedButton}
                            >
                                VIEW&nbsp;SEATS
                            </ContainedButton>
                        </a>
                    ) : null}
                    {user.id ? (
                        !isAttending ? (
                            <OutlinedButton
                                variant="outlined"
                                className={classes.outlinedButton}
                                onClick={() => addConcert(single_concert)}
                            >
                                I'M&nbsp;ATTENDING
                            </OutlinedButton>
                        ) : (
                            <OutlinedButton
                                variant="outlined"
                                className={classes.outlinedButton}
                                onClick={() => removeConcert(single_concert.id)}
                            >
                                REMOVE&nbsp;CONCERT
                            </OutlinedButton>
                        )
                    ) : (
                        <Link className={classes.link} to="/login">
                            <OutlinedButton
                                variant="outlined"
                                className={classes.outlinedButton}
                            >
                                LOG IN TO ADD CONCERT
                            </OutlinedButton>
                        </Link>
                    )}
                </div>
                {single_concert.images ? (
                    <img
                        className={classes.rightBox}
                        src={getWorkingImage(single_concert.images)}
                    />
                ) : null}
            </div>
            <div className={classes.container}>
                <div className={classes.detailsElement}>
                    <Typography variant="h6" gutterBottom>
                        Venue Details
                    </Typography>
                    {single_concert._embedded ? (
                        <Typography variant="h6" gutterBottom>
                            Name:&nbsp;
                            {single_concert._embedded.venues[0].name}
                        </Typography>
                    ) : null}
                    {single_concert.dates ? (
                        <Typography variant="h6">
                            Start Time:&nbsp;
                            {convertTime(single_concert.dates.start.localTime)}
                        </Typography>
                    ) : null}
                    {single_concert.pleaseNote ? (
                        <Typography className={classes.note} gutterBottom>
                            {single_concert.pleaseNote}
                        </Typography>
                    ) : null}
                </div>
                <div className={classes.detailsElement}>
                    <ConcertFriends concert={single_concert} />
                </div>

                {/*sSpotify Player*/}
                <div className={classes.spotifyFrame}>
                    {user.spotifyId ? (
                        <ArtistTracks artistName={artistName} />
                    ) : (
                        <div>
                            <Link to="/login" className={classes.link}>
                                <ContainedButton
                                    className={classes.spotifyButton}
                                    startIcon={svgIcon}
                                >
                                    LOGIN WITH SPOTIFY FOR ARTIST PREVIEW
                                </ContainedButton>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
