import React, { useContext, useEffect, useState } from 'react';
import { CssBaseline, Typography, AppBar, Card, CardActions, CardActionArea, CardMedia, CardContent, Container, Grid, Box } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import concertBackground from '../../public/concertBackground.png'
import {GlobalState} from '../contexts/Store'
import { styled } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import MuiButton from "@material-ui/core/Button";

const Button = styled(MuiButton)(spacing)

const useStyles =  makeStyles((theme) =>({
  CardActionArea: {
    display: 'flex',
    backgroundColor:'white',
    color: 'black'
  },
  CardContent: {
    color: 'black',
    width: 160,
    height: 160,
  },
  paperContainer: {
    backgroundImage: `url(${concertBackground})`
},
mainFeaturedPostContent: {
    position: 'relative',
    height: 500,
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    }
},
leftBox:{
    backgroundColor: 'black',
    height: '300px',
    padding: '30px'
},
rightBox:{

},
button: {
    margin: theme.spacing(1),
    borderRadius: "5em"
  },
  element:{
    backgroundColor: '#311b92',
    height: '300px',
    padding: '30px',
    margin: '20px',
    direction:"row",
    justify:"center",
    alignItems:"center",
    padding: '30px'
  },
  mainGrid:{
    direction:"row",
    justify:"center",
    alignItems:"center",
    paddingLeft: '100px',
  }

}));

export default function Cards(props){
    const [count, setCount]= useState(true)

    const convertTime=(time)=>{

        time = time.split(':'); 

        var hours = Number(time[0]);
        var minutes = Number(time[1]);
        var seconds = Number(time[2]);

        var timeValue;

        if (hours > 0 && hours <= 12) {
        timeValue= "" + hours;
        } else if (hours > 12) {
        timeValue= "" + (hours - 12);
        } else if (hours == 0) {
        timeValue= "12";
        }
        
        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  
        timeValue += (hours >= 12) ? " P.M." : " A.M."; 
        return timeValue
    }


    const getWorkingImage=(imageArr)=>{
        let workingImages=[]
        console.log('image arr', imageArr)
        for(let image of imageArr){
            if(image.ratio==='3_2') return image.url
        }
    }

    const classes = useStyles()

    return <>
        <CssBaseline/>
        <main>
            <div display='flex'>
   `            <Grid container>
                    <Grid item md={8} className={classes.leftBox}>
                        <Container>

                            <Typography variant='h3'  color='textPrimary' gutterBottom bgcolor="text.primary">{props.props.name}</Typography>
                            {props.props.dates?<Typography variant='h5' color='textPrimary' gutterBottom bgcolor="text.primary">{props.props.dates.start.localDate}</Typography>: null}
                            {props.props.url?<Button margin='30px' variant="contained" color="primary"><a href={props.props.url}>View Seats</a></Button>: null}
                            {props.props.url?<Button variant="outlined" color="primary">I'm Attending</Button>: null}
                        </Container>
                    </Grid>

                    {props.props.images? <Grid item md={4} className={classes.rightBox} ><img height='300px' src={getWorkingImage(props.props.images)} /></Grid>: null}

                </Grid>

            </div>
            <div>
                <Grid container  className={classes.mainGrid} >
                    <Grid item xs={3} className={classes.element} >
                        <Typography variant='h4'  color='textPrimary' gutterBottom bgcolor="text.primary">Venue Details</Typography>
                        {props.props._embedded?<Typography variant='h6'  color='textPrimary' gutterBottom bgcolor="text.primary">Venue: {props.props._embedded.venues[0].name}</Typography>: null}
                        {props.props.dates?<Typography variant='h6'  color='textPrimary' gutterBottom bgcolor="text.primary">Start Time: {convertTime(props.props.dates.start.localTime)}</Typography>: null}
                    </Grid>
                    <Grid item xs={3} className={classes.element} ></Grid>
                    <Grid item xs={3} className={classes.element} ></Grid>
                </Grid>
            </div>
        </main>
    </>
}