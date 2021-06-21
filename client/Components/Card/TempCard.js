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

const useStyles = makeStyles((theme) => {
    // const { personalization } = useContext(GlobalState);
    // let [personalized, setPersonalized] = personalization;
    // console.log(personalized);
    // const hexColor = personalized
    //     ? theme.palette.primary.main
    //     : theme.palette.accent.main;
    // console.log(hexColor);

    const hexColor = theme.palette.text.primary;

    return {
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
            marginTop: '1rem',
            textDecoration: 'inherit',
            color: 'inherit',
        },
        outlinedButton: {
            height: '2.25rem',
            fontSize: '0.65rem',
            marginBottom: '1rem',
            color: hexColor,
            borderColor: hexColor,
        },
        cardActions: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#363073',
        },
    };
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
                        <Link to="/login">
                            <Typography>login to add concert</Typography>
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
                            SEE EVENT INFORMATION
                        </OutlinedButton>
                    </Link>
                </CardActions>
            </Card>
        )
    );
}
