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

import OutlinedButton from '../StyledComponents/OutlinedButton';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '16rem',
        marginTop: 0,
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
        marginTop: '1rem',
        textDecoration: 'inherit',
        color: 'inherit',
        width: '100%',
    },
    outlinedButton: {
        height: '2.25rem',
        fontSize: '0.65rem',
        marginBottom: '1rem',
        color: theme.palette.text.primary,
        borderColor: theme.palette.text.primary,
        padding: '0 20px',
    },
    cardActions: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#363073',
    },
}));

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
                        image={getConcertImage(concertData)}
                        title="glass"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            {concertData.name}
                        </Typography>
                        <Typography variant="caption">
                            {getDateInStringFormat(
                                concertData.dates.start.localDate
                            )}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
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
                        <Link to={`/login`} className={classes.link}>
                            <OutlinedButton
                                variant="outlined"
                                className={classes.outlinedButton}
                            >
                                LOG IN TO SAVE&nbsp;EVENT
                            </OutlinedButton>
                        </Link>
                    )}{' '}
                    <Link
                        to={`/concert/${concertData.id}`}
                        onClick={() => {
                            setCurrConcert(concertData);
                        }}
                        className={classes.link}
                    >
                        <OutlinedButton
                            variant="outlined"
                            className={classes.outlinedButton}
                        >
                            SEE&nbsp;EVENT DETAILS
                        </OutlinedButton>
                    </Link>
                </CardActions>
            </Card>
        )
    );
}
