import React, { useEffect, useContext, useState } from 'react';
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';

import { GlobalState } from '../../contexts/Store';
import personalizedMarkerIcon from '../Map/personalizedMarkerIcon';

const Map = () => {
    const { auth, getUserData, location, getUserLocation, googleInformation } =
        useContext(GlobalState);

    const [googleInfo, setGoogleInfo] = googleInformation;

    return (
        <div>
            <LoadScript
                googleMapsApiKey={googleInfo.GOOGLE_MAP_KEY}
                mapIds={googleInfo.GOOGLE_MAP_ID}
            >
                <GoogleMap
                    // onClick={onMapClick}
                    zoom={5}
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
                >
                    {/* {venues
                        ? Object.keys(venues).map((venue, idx) => {
                              if (venues[venue][0].lat) {
                                  return (
                                      <Marker
                                          key={venues[venue][0].id}
                                          onClick={() =>
                                              onMarkerPopup(
                                                  venues[venue][0].lat,
                                                  venues[venue][0].lon,
                                                  venue,
                                                  venues[venue]
                                              )
                                          }
                                          position={{
                                              lat: +venues[venue][0].lat,
                                              lng: +venues[venue][0].lon,
                                          }}
                                          icon={personalizedMarkerIcon}
                                      />
                                  );
                              }
                          })
                        : null} */}

                    {/* {markerState.isOpen && (
                        <InfoWindow
                            position={{
                                lat: markerState.selectedEventLat,
                                lng: markerState.selectedEventLong,
                            }}
                        >
                            <div style={{ color: 'black' }}>
                                {markerState.selectedVenueName}
                            </div>
                        </InfoWindow>
                    )} */}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Map;
