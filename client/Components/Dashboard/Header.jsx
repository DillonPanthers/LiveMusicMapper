import React from 'react';
import { Typography, makeStyles, Avatar, Link, Icon } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    upperContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
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
}));

const Header = ({ userInfo }) => {
    const classes = useStyles();
    return (
        <div className={classes.upperContainer}>
            <Avatar
                className={classes.avatar}
                src="profile_pic_placeholder.png"
            />
            <div>
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
        </div>
    );
};

export default Header;
