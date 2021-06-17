import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import concertBackground from '../../public/concertBackground.png';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { GlobalState } from '../contexts/Store';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    CardActionArea: {
        display: 'flex',
        backgroundColor: 'white',
        color: 'black',
    },
    CardContent: {
        color: 'black',
        width: 160,
        height: 160,
    },
    paperContainer: {
        backgroundImage: `url(${concertBackground})`,
    },
    mainFeaturedPostContent: {
        position: 'relative',
        height: 500,
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
}));

export default function Cards(props) {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const classes = useStyles();

    return (
        <Paper style={{ backgroundImage: useStyles.paperContainer }}>
            <div
                className={useStyles.mainFeaturedPost}
                style={{
                    height: 400,
                    position: 'relative',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url('https://static01.nyt.com/images/2020/03/12/arts/12virus-concerts2/merlin_170369790_63d02a4c-82f8-441a-ac7c-c395828b7961-superJumbo.jpg?quality=90&auto=webp')`,
                }}
            >
                <div>
                    <Typography variant="h1">{props.props.name}</Typography>
                </div>
                {props.props.dates ? (
                    <div>
                        <Typography variant="h3">
                            Date: {props.props.dates.start.localDate}
                        </Typography>
                        {props.props ? (
                            <Typography variant="h3">
                                Venue: {props.props._embedded.venues[0].name}
                            </Typography>
                        ) : null}
                    </div>
                ) : null}
            </div>
            <div style={{ width: 500, display: 'flex' }}>
                <Card>
                    <CardActionArea style={useStyles.CardActionArea}>
                        <CardContent style={{ color: 'black' }}>
                            {props.props.images
                                ? props.props.images.map((curr, idx) => {
                                      if (idx < 2)
                                          return (
                                              <CardMedia
                                                  key={idx}
                                                  style={{
                                                      height: 200,
                                                      width: 500,
                                                      display: 'flex',
                                                  }}
                                                  image={curr.url}
                                              />
                                          );
                                  })
                                : null}
                        </CardContent>
                        <CardContent style={{ color: 'black' }}>
                            Concert Name: {props ? props.props.name : null}
                        </CardContent>
                        {props.props.classifications ? (
                            <CardContent style={{ color: 'black' }}>
                                Genre:{' '}
                                {props.props.classifications[0].genre.name}
                            </CardContent>
                        ) : null}
                        {props.props ? (
                            <CardContent style={{ color: 'black' }}>
                                Location{' '}
                                {props.props._embedded
                                    ? props.props._embedded.venues[0].name
                                    : null}
                            </CardContent>
                        ) : null}
                        {props.props.dates ? (
                            <CardContent style={{ color: 'black' }}>
                                Date: {props.props.dates.start.localDate}
                            </CardContent>
                        ) : null}
                        {props.props.dates ? (
                            <CardContent style={{ color: 'black' }}>
                                Time: {props.props.dates.start.localTime}
                            </CardContent>
                        ) : null}
                        {props.props.priceRanges ? (
                            <CardContent style={{ color: 'black' }}>
                                Price Range: ${props.props.priceRanges[0].min}{' '}
                                to ${props.props.priceRanges[0].max}
                            </CardContent>
                        ) : null}
                        {props.props.info ? (
                            <CardContent style={{ color: 'black' }}>
                                Details: {props.props.info}
                            </CardContent>
                        ) : null}
                    </CardActionArea>
                    {props.props.url ? (
                        <Button style={{ color: 'black' }}>
                            <a href={props.props.url}>View Seats</a>
                        </Button>
                    ) : null}

                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            </div>
        </Paper>
    );
}
