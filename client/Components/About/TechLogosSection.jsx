import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import TechLogoCardlist from './TechLogoCardList';
import techStack from './techStack';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '1.5rem',
    },
});

const TechLogosSection = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Typography variant="h6">Backend</Typography>
            <TechLogoCardlist technologies={techStack.backend} />

            <Typography variant="h6">Frontend</Typography>
            <TechLogoCardlist technologies={techStack.frontend} />

            <Typography variant="h6">Libraries</Typography>
            <TechLogoCardlist technologies={techStack.libraries} />

            <Typography variant="h6">APIs</Typography>
            <TechLogoCardlist technologies={techStack.apis} />
        </div>
    );
};

export default TechLogosSection;
