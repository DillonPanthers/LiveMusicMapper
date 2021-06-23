import React from 'react';
import { Typography, makeStyles, Avatar, Link, Icon } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    upperContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: '.75rem',
        height: '10rem',
    },
    avatar: {
        margin: '.5rem',
        width: '100px',
        height: '100px',
    },

    name: {
        marginLeft: '.5rem',
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
                <Avatar
                    className={classes.avatar}
                    src="profile_pic_placeholder.png"
                />

                <Typography variant="h4" className={classes.name}>
                    {`${userInfo.firstName} ${userInfo.lastName}`}
                </Typography>
                {userInfo.spotifyId ? (
                    <Link
                        target="_blank"
                        rel="noreferrer"
                        href={`http://open.spotify.com/user/${userInfo.spotifyId}`}
                    >
                        <Icon color="primary">
                            <img
                                className={classes.spotify}
                                src="Spotify_Icon_RGB_Green.png"
                            />
                        </Icon>
                    </Link>
                ) : (
                    <></>
                )}
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
