import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Typography,
    makeStyles,
    Avatar,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import { getDateInStringFormat } from '../Card/utils';
import { convertTime } from './utils';
import { attendingFriends } from '../../contexts/concertUtil';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    cardRoot: {
        width: '16rem',
        marginTop: 10,
        marginBottom: 10,
        color: 'white',
        backgroundColor: '#000A47',
        '&:hover': {
            boxShadow: '2px 2px 5px #01072a',
        },
    },
    cardActions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: '#363073',
    },
    avatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        backgroundColor: theme.palette.accent.main,
        border: 'none',
    },
    link: {
        textDecoration: 'inherit',
        color: 'inherit',
    },
    caption: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

//logged in user
//did we have friends.length? for reason

const EventInfo = ({ concertInfo, friends, loggedInUserId }) => {
    const [concertFriends, setConcertFriends] = useState([]);
    const [attending, setAttending] = useState(false);
    const [inDashboard, setInDashboard] = useState(false);

    useEffect(() => {
        const grabFriends = async () => {
            const [myFriends, attendees] = await attendingFriends(
                concertInfo.id,
                friends
            );
            console.log(attendees);
            setAttending(attendees.includes(loggedInUserId));
            setConcertFriends(myFriends);
        };

        if (concertInfo.id) {
            grabFriends();
        }
    }, []);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Card className={classes.cardRoot}>
                <Link
                    className={classes.link}
                    to={`/concert/${concertInfo.id}`}
                >
                    <CardActionArea>
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="h2"
                            >
                                {concertInfo.name}
                            </Typography>
                            <div className={classes.caption}>
                                <Typography variant="caption">
                                    {getDateInStringFormat(concertInfo.date)}
                                </Typography>
                                <Typography variant="caption">
                                    {convertTime(concertInfo.time)}
                                </Typography>
                            </div>
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                            <Typography variant="caption">
                                {concertFriends.length
                                    ? 'Friends Attending'
                                    : 'No Other Friends Attending'}
                            </Typography>
                            <AvatarGroup max={4}>
                                {concertFriends.map((friend) => (
                                    <Avatar
                                        key={friend.id}
                                        src={friend.imageUrl}
                                        className={classes.avatar}
                                    >{`${friend.firstName[0]}${friend.lastName[0]}`}</Avatar>
                                ))}
                            </AvatarGroup>
                        </CardActions>
                    </CardActionArea>
                </Link>
            </Card>
        </div>
    );
};

export default EventInfo;
