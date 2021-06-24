import React from 'react';
import {
    Badge,
    Typography,
    makeStyles,
    withStyles,
    Avatar,
    Link,
    Icon,
} from '@material-ui/core';

import SpotifyBadge from '../StyledComponents/SpotifyBadge';

const useStyles = makeStyles((theme) => ({
    upperContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: '1.5rem',
        height: '10rem',
    },

    name: {
        marginLeft: '.5rem',
    },

    avatar: {
        margin: '.5rem',
        width: '100px',
        height: '100px',
    },

    spotify: {
        width: '1.5rem',
        height: '1.5rem',
        marginLeft: '.5rem',
    },

    spotifyInfo: {
        display: 'flex',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'column',
    },
    info: {
        display: 'flex',
        alignItems: 'center',
        flex: '1',
    },

    link: {
        marginTop: '.75rem',
    },
}));

const Header = ({ userInfo }) => {
    const classes = useStyles();
    const topGenre = userInfo.ticketmasterGenres
        ? Object.keys(userInfo.ticketmasterGenres)[0]
        : 'none';
    const topArtists = userInfo.artists
        ? Object.keys(userInfo.artists).slice(0, 3).join(' | ')
        : 'none';
    return (
        <div className={classes.upperContainer}>
            <div className={classes.info}>
                {userInfo.spotifyId ? (
                    <SpotifyBadge
                        spotifyId={userInfo.spotifyId}
                        imageUrl={userInfo.imageUrl}
                    />
                ) : (
                    <Avatar
                        className={classes.avatar}
                        src={userInfo.imageUrl}
                    />
                )}

                <Typography variant="h4" className={classes.name}>
                    {`${userInfo.firstName} ${userInfo.lastName}`}
                </Typography>
            </div>
            {userInfo.spotifyId ? (
                <div className={classes.spotifyInfo}>
                    <Typography>
                        <strong>Top Genres | </strong>
                        {topGenre}
                    </Typography>
                    <Typography>
                        <strong>Top Artists | </strong>
                        {topArtists}
                    </Typography>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Header;
