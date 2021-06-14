import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearIcon from '@material-ui/icons/Clear';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
} from '@material-ui/core';

import axios from 'axios';

import { GlobalState } from '../../contexts/Store';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        marginTop: 5,
        marginBottom: 5,
        color: 'black',
    },
    media: {
        height: 140,
    },
});

export default function TempCard({ concertData, isAttending }) {
    const classes = useStyles();

    const { currSingleConcert, auth, getUserData } = useContext(GlobalState);
    const [currConcert, setCurrConcert] = currSingleConcert;
    const [user] = auth;

    const addConcert = async (concert) => {
        const userId = user.id;
        await axios.post('/api/user/concert', { userId, concert });
        await getUserData();
    };

    const removeConcert = async (concertId) => {
        const userId = user.id;
        await axios.delete('/api/user/concert', {
            data: { userId, concertId },
        });
        await getUserData();
    };

    return (
        Object.keys(concertData).length > 0 && (
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="https://www.ravejungle.com/wp-content/uploads/2018/09/rave-ravejungle-696x464-696x464.jpg"
                        title="glass"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {concertData.name}
                        </Typography>
                        <Typography>
                            Start Date: {concertData.dates.start.localDate}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            <Link
                                to={`/concert/${concertData.id}`}
                                onClick={() => {
                                    setCurrConcert(concertData);
                                }}
                            >
                                Click here to get to single concert page
                            </Link>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {!isAttending ? (
                        <IconButton onClick={() => addConcert(concertData)}>
                            <FavoriteIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                            onClick={() => removeConcert(concertData.id)}
                        >
                            <ClearIcon />
                        </IconButton>
                    )}
                </CardActions>
            </Card>
        )
    );
}
