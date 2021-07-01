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
            <Typography variant="h6">
                Runtime Environment{' & '}Web Application Framework
            </Typography>
            <TechLogoCardlist technologies={techStack.backend} />

            <Typography variant="h6">
                Database Management System{' & '}ORM
            </Typography>
            <TechLogoCardlist
                technologies={techStack.databaseManagementSystem}
            />

            <Typography variant="h6">Frontend Frameworks</Typography>
            <TechLogoCardlist technologies={techStack.frontendFrameworks} />

            <Typography variant="h6">APIs</Typography>
            <TechLogoCardlist technologies={techStack.apis} />

            <Typography variant="h6">Tooling</Typography>
            <TechLogoCardlist technologies={techStack.tooling} />

            <Typography variant="h6">Libraries</Typography>
            <TechLogoCardlist technologies={techStack.libraries} />
        </div>
    );
};

export default TechLogosSection;
