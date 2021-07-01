import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

import ourStory from './ourStory';
import buildDescription from './buildDescription';
import Map from './Map';
import ProfileCardsList from './ProfileCardsList';
import TechLogosSection from './TechLogosSection';
import ContainedButton from '../StyledComponents/ContainedButton';

// TODO: breakpoints for responsiveness
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0.75rem',
    },
    sectionContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '20rem',
        margin: '0.75rem',
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '25rem',
        marginRight: '1.5rem',
        paddingRight: '1.5rem',
    },
    rightContainer: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '1.5rem',
        width: '55vw',
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    },
    horizontalLine: {
        color: 'white',
        backgroundColor: 'white',
        height: 1,
        width: '100%',
        marginTop: '3rem',
    },
    button: {
        width: '16rem',
        margin: '1.5rem 0rem',
    },
}));

const About = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            {/* Our Story */}
            <div className={classes.sectionContainer}>
                <div className={classes.contentContainer}>
                    <div className={classes.textContainer}>
                        <Typography variant="h4">Our Story</Typography>
                        {ourStory.split('\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                        <a
                            href="https://github.com/DillonPanthers/LiveMusicMapper"
                            target="_blank"
                            className={classes.link}
                        >
                            <ContainedButton
                                startIcon={<GitHubIcon />}
                                className={classes.button}
                            >
                                GITHUB REPOSITORY
                            </ContainedButton>
                        </a>
                    </div>
                    <div className={classes.rightContainer}>
                        <Map />
                        <ProfileCardsList />
                    </div>
                </div>
                <hr className={classes.horizontalLine} />
            </div>
            {/* Tech Stack */}
            <div className={classes.sectionContainer}>
                <div className={classes.contentContainer}>
                    <div className={classes.textContainer}>
                        <Typography variant="h4">How We Built This</Typography>
                        {buildDescription.split('\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>
                    <div className={classes.rightContainer}>
                        <TechLogosSection />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
