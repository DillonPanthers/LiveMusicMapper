import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        marginTop: 5,
        marginBottom: 5,
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function ConcertCard({ concertData }) {
    //TODO: UPDATE TEXT COLOR, CONCERT NAME AND TEXT IS SHOWING UP WE JUST CAN'T SEE IT YET
    //TODO: UPDATE MARGINS BETWEEN EACH CARD AND CSS SO THAT THERE IS SOME FLEX GOING ON
    //TODO: FIND OUT WHAT OTHER INFO YOU NEED FOR THE CONCERT
    //TODO: DECIDE WHAT WE WANT TO DO WITH THE HEART BUTTONS AND SHARE BUTTONS AS WELL AS ARIA LABELS, MAYBE WE CAN USE HEART AS A ADD CONCERT, ETC, IF NOT WE CAN JUST REMOVE IT

    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        Object.keys(concertData).length > 0 && (
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="concert" className={classes.avatar}>
                            Data
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={concertData.name}
                    subheader={`${concertData.dates.start.localDate}`}
                />
                <CardMedia
                    className={classes.media}
                    image="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bXVzaWMlMjBjb25jZXJ0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
                    title="concert item"
                />
                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        Enter Basic Concert Details Here
                    </Typography>
                </CardContent>
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
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Concert Details:</Typography>

                        <Typography paragraph>
                            {concertData.info
                                ? concertData.info
                                : 'No Concert Information Yet'}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        )
    );
}
