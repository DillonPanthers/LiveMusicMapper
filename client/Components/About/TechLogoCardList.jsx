import React from 'react';
import { makeStyles } from '@material-ui/core';

import TechLogoCard from './TechLogoCard';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        gridGap: '1.5rem',
        flexWrap: 'wrap',
    },
});

const TechLogoCardList = ({ technologies }) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            {technologies.map((tech, idx) => (
                <TechLogoCard key={idx} tech={tech} />
            ))}
        </div>
    );
};

export default TechLogoCardList;
