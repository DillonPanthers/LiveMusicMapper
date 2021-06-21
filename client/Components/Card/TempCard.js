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
import { getDateInStringFormat, getConcertImage } from './utils';

const useStyles = makeStyles({
    root: {
        width: '18rem',
        marginTop: 10,
        marginBottom: 10,
        color: 'white',
        backgroundColor: '#000A47',
        '&:hover': {
            boxShadow: '2px 2px 5px #01072a',
        },
    },
    media: {
        height: 140,
        objectFit: 'contain',
        position: 'top',
    },
    heart: {
        color: 'pink',
    },
    clear: {
        color: 'red',
    },
    link: {
        marginTop: '1rem', // add button instead
        color: 'white',
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

    console.log('concertData', concertData);

    return (
        Object.keys(concertData).length > 0 && (
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={getConcertImage(concertData)}
                        title="glass"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            {concertData.name}
                        </Typography>
                        <Typography>
                            {getDateInStringFormat(
                                concertData.dates.start.localDate
                            )}
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
                                className={classes.link}
                            >
                                Click here to see event information
                            </Link>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {user.id ? (
                        !isAttending ? (
                            <IconButton onClick={() => addConcert(concertData)}>
                                <FavoriteIcon className={classes.heart} />
                            </IconButton>
                        ) : (
                            <IconButton
                                onClick={() => removeConcert(concertData.id)}
                            >
                                <ClearIcon className={classes.clear} />
                            </IconButton>
                        )
                    ) : (
                        <Link to="/login">
                            <Typography>login to add concert</Typography>
                        </Link>
                    )}
                </CardActions>
            </Card>
        )
    );
}
