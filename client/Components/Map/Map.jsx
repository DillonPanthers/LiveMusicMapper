import React, { useContext, useState, useEffect } from 'react';
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';

import { GlobalState } from '../../contexts/Store';

import Loading from '../Loading/Loading';
import LoadingOnCard from '../Loading/LoadingOnCard';
import Sidebar from '../Sidebar/Sidebar';
import GuestNavBar from '../SecondNavBar/GuestNavBar';
import PersonalizedNavBar from '../SecondNavBar/PersonalizedNavBar';

import {
    getEvents,
    getTopArtistsEvents,
    getRecommendedArtistsEvents,
    getTopGenresEvents,
    getVenueObject,
} from '../SecondNavBar/utils';

// Marker colors for non-personalized events are orange
import markerIcon from './markerIcon';
// Marker colors for non-personalized events are aqua
import personalizedMarkerIcon from './personalizedMarkerIcon';

function Map() {
    const [state, setState] = useState({
        selectedEventLat: 0,
        selectedEventLong: 0,
        selectedEventName: '',
        isOpen: false,
    });

    const [isLoading, setIsLoading] = useState(true);
    const [initialCall, setInitialCall] = useState(true);
    const [eventsLoading, setEventsLoading] = useState(true);

    const {
        currSingleVenue,
        location,
        venues,
        auth,
        genres,
        theRadius,
        mapViews,
        personalization,
        googleInformation,
    } = useContext(GlobalState);

    const [venueDataObj, setVenues] = venues;
    const [locationData, setLocation] = location;
    const [singleVenue, setSingleVenue] = currSingleVenue;
    const [user, setUser] = auth;
    const [genre, setGenre] = genres;
    const [radius, setRadius] = theRadius;
    const [mapView, setMapView] = mapViews;
    const [personalized, setPersonalized] = personalization;
    const [googleInfo, setGoogleInfo] = googleInformation;

    useEffect(() => {
        const getUserLocation = async () => {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });

                setInitialCall(false);
            });
        };

        const getVenueData = async () => {
            setEventsLoading(true);
            let tmEvents;

            if (mapView === '') {
                tmEvents = await getEvents(locationData, radius, genre);
            }

            if (mapView === 'topArtists') {
                tmEvents = await getTopArtistsEvents(
                    user,
                    locationData,
                    radius
                );
            }
            if (mapView === 'recommendedArtists') {
                tmEvents = await getRecommendedArtistsEvents(
                    user,
                    locationData,
                    radius
                );
            }
            if (mapView === 'topGenres') {
                tmEvents = await getTopGenresEvents(user, locationData, radius);
            }

            // take ticketmaster data and convert it to an object with venues as the keys. Each venue will have its own object containing keys for venue information and events
            const venueObj = await getVenueObject(tmEvents);

            setVenues(venueObj);
            setEventsLoading(false);
        };

        if (locationData.lon && locationData.lat) {
            getVenueData();
            setTimeout(() => {
                setIsLoading(false);
            }, 0);
        }
        if (initialCall) {
            getUserLocation();
        }
    }, [locationData.lat, radius]);

    const newLocation = function () {
        const lat = this.getCenter().lat();
        const lon = this.getCenter().lng();
        setLocation({
            lat,
            lon,
        });
    };

    function distance(lat1, lon1, lat2, lon2, unit) {
        if (lat1 == lat2 && lon1 == lon2) {
            return 0;
        } else {
            var radlat1 = (Math.PI * lat1) / 180;
            var radlat2 = (Math.PI * lat2) / 180;
            var theta = lon1 - lon2;
            var radtheta = (Math.PI * theta) / 180;
            var dist =
                Math.sin(radlat1) * Math.sin(radlat2) +
                Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = (dist * 180) / Math.PI;
            dist = dist * 60 * 1.1515;

            return Math.round(dist);
        }
    }

    const newZoom = function () {
        if (this.getBounds()) {
            const lat1 = this.getCenter().lat();
            const lng1 = this.getCenter().lng();

            //TODO: CHECK IF EB IS ALWAYS SECOND
            const zoomDir = this.getBounds();
            const keys = Object.keys(zoomDir);
            const lat2 = zoomDir[keys[0]].g;
            const lng2 = zoomDir[keys[1]].g;

            const newRadius = distance(lat1, lng1, lat2, lng2);
            setRadius(newRadius);
        }
    };

    const onMarkerPopup = function (event) {
        setSingleVenue(event);
        const selectedEventLat = +event.venueData.location.latitude;
        const selectedEventLong = +event.venueData.location.longitude;
        const selectedEventName = event.venueData.name;

        setState({
            ...state,
            selectedEventLat,
            selectedEventLong,
            selectedEventName,
            isOpen: true,
        });
    };

    const onMapClick = () => {
        setState({ ...state, isOpen: false });
    };

    const marker = personalized ? personalizedMarkerIcon : markerIcon;

    return isLoading ? (
        <Loading loading={isLoading} />
    ) : (
        <div>
            {eventsLoading ? <LoadingOnCard loading={eventsLoading} /> : <></>}
            {user.spotifyId ? <PersonalizedNavBar /> : <GuestNavBar />}
            <LoadScript
                googleMapsApiKey={googleInfo.GOOGLE_MAP_KEY}
                mapIds={googleInfo.GOOGLE_MAP_ID}
            >
                <GoogleMap
                    zoom={10}
                    center={{
                        lat: locationData.lat,
                        lng: locationData.lon,
                    }}
                    mapContainerStyle={{
                        height: '90vh',
                        width: '100vw',
                    }}
                    onDragEnd={newLocation}
                    onZoomChanged={newZoom}
                    onClick={onMapClick}
                    options={{
                        mapTypeControl: false,
                        fullscreenControl: false,
                        mapId: googleInfo.GOOGLE_MAP_ID,
                    }}
                >
                    {venueDataObj
                        ? Object.keys(venueDataObj).map((currEvent) => {
                              if (venueDataObj[currEvent].venueData.location) {
                                  return (
                                      <Marker
                                          key={
                                              venueDataObj[currEvent].venueData
                                                  .id
                                          }
                                          onClick={() =>
                                              onMarkerPopup(
                                                  venueDataObj[currEvent]
                                              )
                                          }
                                          position={{
                                              lat: +venueDataObj[currEvent]
                                                  .venueData.location.latitude,
                                              lng: +venueDataObj[currEvent]
                                                  .venueData.location.longitude,
                                          }}
                                          icon={marker}
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
                            id="info-window"
                        >
                            <div>{state.selectedEventName}</div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
            <Sidebar showView={state.isOpen} />
        </div>
    );
}

export default Map;
