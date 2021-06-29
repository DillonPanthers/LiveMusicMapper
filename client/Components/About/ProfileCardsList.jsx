import React from 'react';
import { makeStyles } from '@material-ui/core';

import teamInfo from './teamInfo';
import ProfileCard from './ProfileCard';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        columnGap: '1.5rem',
    },
});

const ProfileCardsList = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            {teamInfo.map((user, i) => (
                <ProfileCard key={i} user={user} />
            ))}
        </div>
    );
};

export default ProfileCardsList;
