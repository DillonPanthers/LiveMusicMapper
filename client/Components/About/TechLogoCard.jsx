import React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        width: '10rem',
        '&:hover': {
            boxShadow: '2px 2px 5px #01072a',
        },
    },
    media: {
        height: '5rem',
        objectFit: 'contain',
        padding: '1rem',
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    },
}));

const TechLogoCard = ({ tech }) => {
    const classes = useStyles();
    return (
        <Card className={classes.container}>
            <img className={classes.media} src={tech.logo} />
        </Card>
    );
};

export default TechLogoCard;
