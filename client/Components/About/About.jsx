import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

import ourStory from './ourStory';
import Map from './Map';
import ProfileCardsList from './ProfileCardsList';

// TODO: breakpoints for responsiveness
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid yellow',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '20rem',
        border: '2px solid green',
        margin: '1.5rem',
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'row',
        border: '2px solid pink',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '20rem',
        border: '2px solid orange',
        marginRight: '1.5rem',
        paddingRight: '1.5rem',
    },
    rightContainer: {
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid red',
        rowGap: '1.5rem',
        width: '60vw',
    },
    link: {
        color: 'inherit',
    },
    horizontalLine: {
        color: 'white',
        backgroundColor: 'white',
        height: 1,
        width: '100%',
        marginTop: '1.5rem',
    },
}));

const ColoredLine = () => (
    <hr
        style={{
            color: 'white',
            backgroundColor: 'white',
            height: 5,
            width: '90vw',
        }}
    />
);

const About = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.sectionContainer}>
                <div className={classes.contentContainer}>
                    <div className={classes.textContainer}>
                        <Typography variant="h4">Our Story</Typography>
                        {ourStory.split('\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                        <p>
                            Check out our project on{' '}
                            <a
                                href="https://github.com/DillonPanthers/LiveMusicMapper"
                                target="_blank"
                                className={classes.link}
                            >
                                <strong>GitHub</strong>
                            </a>
                        </p>
                    </div>
                    <div className={classes.rightContainer}>
                        <Map />
                        <ProfileCardsList />
                    </div>
                </div>
                <hr className={classes.horizontalLine} />
            </div>

            <div className={classes.sectionContainer}>
                <div className={classes.contentContainer}>
                    <div className={classes.textContainer}>
                        <Typography variant="h4">Tech Stack</Typography>
                        {ourStory.split('\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>
                    <div className={classes.rightContainer}>
                        <ProfileCardsList />
                    </div>
                </div>
                <hr className={classes.horizontalLine} />
            </div>
        </div>
    );
};

export default About;
