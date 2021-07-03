import React, { useContext, useState } from 'react';
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';
import { makeStyles } from '@material-ui/core';
import { FaMusic } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/fa';

import { GlobalState } from '../../contexts/Store';
import personalizedMarkerIcon from '../Map/personalizedMarkerIcon';
import teamInfo from './teamInfo';

const useStyles = makeStyles((theme) => ({
    infoWindow: {
        color: theme.palette.background.dark,
    },
}));

const Map = () => {
    const classes = useStyles();

    const { googleInformation } = useContext(GlobalState);
    const [googleInfo, setGoogleInfo] = googleInformation;

    const [markerState, setMarkerState] = useState({
        isOpen: false,
        lat: 0,
        lng: 0,
        name: '',
        favoriteArtist: {},
        city: '',
    });

    const onMarkerPopup = (lat, lng, name, favoriteArtist, city) => {
        setMarkerState({
            ...markerState,
            lat,
            lng,
            name,
            isOpen: true,
            favoriteArtist,
            city,
        });
    };

    const onMapClick = () => {
        setMarkerState({ ...markerState, isOpen: false });
    };

    return (
        <div>
            <LoadScript
                googleMapsApiKey={googleInfo.GOOGLE_MAP_KEY}
                mapIds={googleInfo.GOOGLE_MAP_ID}
            >
                <GoogleMap
                    zoom={4}
                    center={{
                        lat: 36.17745,
                        lng: -86.78528,
                    }}
                    mapContainerStyle={{
                        height: '24rem',
                    }}
                    options={{
                        mapTypeControl: false,
                        fullscreenControl: false,
                        mapId: googleInfo.GOOGLE_MAP_ID,
                    }}
                    onClick={onMapClick}
                >
                    {teamInfo.map((user, idx) => (
                        <Marker
                            key={idx}
                            onClick={() =>
                                onMarkerPopup(
                                    user.lat,
                                    user.lng,
                                    user.name,
                                    user.favoriteArtist,
                                    user.city
                                )
                            }
                            position={{
                                lat: +user.lat,
                                lng: +user.lng,
                            }}
                            icon={personalizedMarkerIcon}
                        />
                    ))}

                    {markerState.isOpen && (
                        <InfoWindow
                            position={{
                                lat: markerState.lat,
                                lng: markerState.lng,
                            }}
                        >
                            <>
                                <div className={classes.infoWindow}>
                                    {markerState.name}
                                    <p>{markerState.city}</p>
                                </div>
                                {Object.keys(markerState.favoriteArtist)
                                    .length ? (
                                    <>
                                        <p>Favorite Artist at the Moment:</p>{' '}
                                        <FaMusic />
                                        &nbsp;
                                        <a
                                            href={
                                                markerState.favoriteArtist[
                                                    Object.keys(
                                                        markerState.favoriteArtist
                                                    )[0]
                                                ]
                                            }
                                            target="_blank"
                                        >
                                            {
                                                Object.keys(
                                                    markerState.favoriteArtist
                                                )[0]
                                            }
                                        </a>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Map;
