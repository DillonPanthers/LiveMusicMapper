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

    const { currSingleConcert } = useContext(GlobalState);
    const { concerts, location } = useContext(GlobalState);
    const [concertData, setConcerts] = concerts;
    const [locationData, setLocation] = location;
    const [singleConcert, setSingleConcert] = currSingleConcert;

    const onMarkerPopup = function (event) {
        setSingleConcert(event);

        const selectedEventLat = +event._embedded.venues[0].location.latitude;
        const selectedEventLong = +event._embedded.venues[0].location.longitude;
        const selectedEventName = event.name;
        const selectedEventDate = event.dates.start.localDate;
        const selectedEventVenue = event._embedded.venues[0].name;
        const selectedEventGenre = event.classifications[0].genre.name;
        const selectedEventSubGenre = event.classifications[0].subGenre.name;
        setState({
            ...state,
            selectedEventLat,
            selectedEventLong,
            selectedEventName,
            selectedEventDate,
            selectedEventVenue,
            selectedEventGenre,
            selectedEventSubGenre,
            isOpen: !state.isOpen,
        });
    };

    useEffect(() => {
        const getUserLocation = async () => {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
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
            setConcerts(ticketDataByLocation.data._embedded.events);

            setState({
                ...state,
                ticketDataByLocation:
                    ticketDataByLocation.data._embedded.events,
            });
        };

        if (state.lon && state.lat) {
            getConcertData();
        }
        getUserLocation();
    }, [state.lat]);

    return (
        //TODO:Filter by genre, and not keyword
        //TODO:Change color of our home marker
        //TODO:Extra feature -> Dragging the map and update location of where we drag to.
        //TODO: Do we need location data in global state? Double check.

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

                {concertData
                    ? concertData.map((currEvent) => {
                          if (currEvent._embedded.venues[0].location) {
                              return (
                                  <Marker
                                      key={currEvent.id}
                                      onClick={() => onMarkerPopup(currEvent)}
                                      position={{
                                          lat: +currEvent._embedded.venues[0]
                                              .location.latitude,
                                          lng: +currEvent._embedded.venues[0]
                                              .location.longitude,
                                      }}
                                  />
                              );
                          }
                      })
                    : null}

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
                            <p>Start Date: {state.selectedEventDate}</p>
                            <p>Venue: {state.selectedEventVenue}</p>
                            <p>
                                Genres: {state.selectedEventGenre},{' '}
                                {state.selectedEventSubGenre}
                            </p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
}

export default Map;
