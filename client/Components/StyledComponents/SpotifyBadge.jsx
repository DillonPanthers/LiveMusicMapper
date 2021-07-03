import React from 'react';
import { Badge, makeStyles, withStyles, Avatar, Link } from '@material-ui/core';

const SmallBadge = withStyles((theme) => ({
    root: {
        width: '1.5rem',
        height: '1.5rem',
    },
}))(Avatar);

const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: '.5rem',
        width: '100px',
        height: '100px',
    },
}));

const SpotifyBadge = ({ spotifyId, imageUrl }) => {
    const classes = useStyles();
    return (
        <Badge
            overlap="circle"
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            badgeContent={
                <Link
                    target="_blank"
                    rel="noreferrer"
                    href={`http://open.spotify.com/user/${spotifyId}`}
                >
                    <SmallBadge src="Spotify_Icon_RGB_Green.png" />
                </Link>
            }
        >
            <Avatar className={classes.avatar} src={imageUrl} />
        </Badge>
    );
};

export default SpotifyBadge;
