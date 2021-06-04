import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';

import { GlobalState } from '../contexts/Store';
import { TICKETMASTERAPIKEY, REACT_APP_GOOGLEAPIKEY } from '../secret';

import Loading from './Loading/Loading'



function Map() {

    const [state, setState] = useState({
        lat: 0,
        lon: 0,
        ticketDataByLocation: [],
        selectedEventLat: 0,
        selectedEventLong: 0,
        selectedEventName: '',
        selectedEventDate: '',
        selectedEventVenue: '',
        selectedEventGenre: '',
        selectedEventSubGenre: '',
        isOpen: false,
    });

    const [isLoading, setIsLoading] = useState(true); 

    const {currSingleConcert} = useContext(GlobalState); 
    const {concerts, location}= useContext(GlobalState)
    const [concertData, setConcerts]= concerts
    const [locationData, setLocation]= location
    const [singleConcert, setSingleConcert] = currSingleConcert; 

    const onMarkerPopup = function (event) {
        setSingleConcert(event); 

        const selectedEventLat = +event.venueData.location.latitude;
        const selectedEventLong = +event.venueData.location.longitude;
        const selectedEventName = event.venueData.name;
        // const selectedEventDate = event.dates.start.localDate;
        // const selectedEventVenue = event._embedded.venues[0].name;
        // const selectedEventGenre = event.classifications[0].genre.name;
        // const selectedEventSubGenre = event.classifications[0].subGenre.name;

        setState({
            ...state,
            selectedEventLat,
            selectedEventLong,
            selectedEventName,
            // selectedEventDate,
            // selectedEventVenue,
            // selectedEventGenre,
            // selectedEventSubGenre,
            isOpen: !state.isOpen,
        });
    };

    useEffect(() => {
        const getUserLocation = async () => {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({lat:position.coords.latitude, lon:position.coords.longitude})
                setState({
                    ...state,
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            });
        };

        const getConcertData = async () => {
            const latlong = state.lat + ',' + state.lon;
            const ticketDataByLocation = await axios.get(
                `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&size=200&latlong=${latlong}&apikey=${TICKETMASTERAPIKEY}`
            );
           
      const venueObj = ticketDataByLocation.data._embedded.events.reduce((accum, event)=>{
        const venueName = event._embedded.venues[0].name; 
        if(!accum.hasOwnProperty(venueName)){
          const venueData = event._embedded.venues[0]; 
          accum[venueName] = {venueData: venueData, venueEvents: new Set() }; 
        }
        return accum; 
      },{})

      ticketDataByLocation.data._embedded.events.map(event =>{
        const eventVenue = event._embedded.venues[0].name; 
        venueObj[eventVenue].venueEvents.add(event)
      })

           
           
            // setConcerts(ticketDataByLocation.data._embedded.events)
            setConcerts(venueObj); 

            setState({
                ...state,
                ticketDataByLocation:
                    ticketDataByLocation.data._embedded.events,
            });
        };

        if (state.lon && state.lat) {
            getConcertData();
            setTimeout(() => {
                setIsLoading(false);
              }, 2000);
        }
        getUserLocation();
    }, [state.lat]);

   

    return (
        //TODO:Filter by genre, and not keyword
        //TODO:Change color of our home marker 
        //TODO:Extra feature -> Dragging the map and update location of where we drag to.
        //TODO: Do we need location data in global state? Double check. 

        
        isLoading?  <Loading loading={isLoading}/> :

        <LoadScript googleMapsApiKey={REACT_APP_GOOGLEAPIKEY}>
            <GoogleMap
                zoom={10}
                center={{ lat: state.lat, lng: state.lon }}
                mapContainerStyle={{ height: '100vh', width: '100vw' }}
            >
                <Marker
                    position={{
                        lat: +locationData.lat,
                        lng: +locationData.lon,
                    }}
                />

                {!Array.isArray(concertData)?Object.keys(concertData).map((currEvent) => {
                    if(concertData[currEvent].venueData.location){
                        
                        return (
                            <Marker
                                key={concertData[currEvent].venueData.id}
                                onClick={() => onMarkerPopup(concertData[currEvent])}
                        
                                position={{
                                    lat: +concertData[currEvent].venueData.location
                                        .latitude,
                                    lng: +concertData[currEvent].venueData.location
                                        .longitude,
                                }}
    
                        
                            />
                        );
                    }
                }): null}

                {state.isOpen && (
                    <InfoWindow
                        position={{
                            lat: state.selectedEventLat,
                            lng: state.selectedEventLong,
                        }}
                    >
                        <div>
                            <Link to={`/concert/${singleConcert.id}`}>
                                {state.selectedEventName}
                            </Link>
                            {/* <p>Start Date: {state.selectedEventDate}</p>
                            <p>Venue: {state.selectedEventVenue}</p>
                            <p>
                                Genres: {state.selectedEventGenre},{' '}
                                {state.selectedEventSubGenre}
                            </p> */}
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
    
}

export default Map;