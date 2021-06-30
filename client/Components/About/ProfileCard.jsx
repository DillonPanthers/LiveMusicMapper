import React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    makeStyles,
} from '@material-ui/core';

import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.light,
        flex: 1,
        '&:hover': {
            boxShadow: '2px 2px 5px #01072a',
        },
    },
    contentContainer: {
        height: '11rem',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    copyContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        rowGap: '0.1rem',
    },
    actionsContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        height: '3rem',
    },
    media: {
        height: '12rem',
        objectFit: 'contain',
        position: 'bottom',
    },
    profileName: {
        fontSize: '1.5rem',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 'bold',
        color: theme.palette.primary.main,
        lineHeight: '1.15',
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    },
    icon: {
        color: 'white',
        margin: '0.25rem',
        verticalAlign: 'middle',
        '&:hover': {
            color: theme.palette.accent.main,
        },
    },
}));

const ProfileCard = ({ user }) => {
    const classes = useStyles();
    const { name, title, linkedIn, gitHub, imageUrl } = user;
    return (
        <Card className={classes.container}>
            <CardMedia className={classes.media} image={imageUrl}></CardMedia>
            <div className={classes.contentContainer}>
                <CardContent className={classes.copyContainer}>
                    <Typography className={classes.profileName} gutterBottom>
                        {name}
                    </Typography>
                    <Typography>{title}</Typography>
                </CardContent>
                <CardActions className={classes.actionsContainer}>
                    <a href={gitHub} target="_blank" className={classes.link}>
                        <GitHubIcon className={classes.icon} />
                    </a>
                    <a href={linkedIn} target="_blank" className={classes.link}>
                        <LinkedInIcon
                            className={classes.icon}
                            fontSize="large"
                        />
                    </a>
                </CardActions>
            </div>
        </Card>
    );
};

export default ProfileCard;
