import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';

import { GlobalState } from '../contexts/Store';
import { REACT_APP_GOOGLEAPIKEY } from '../secret';

const Dashboard = () => {
    const { auth, getUserData, location, getUserLocation } =
        useContext(GlobalState);

    const [user, setUser] = auth;
    const [userLocation, setLocation] = location;

    const [friends, setFriends] = useState([]);
    const [concerts, setConcerts] = useState([]);
    const [venues, setVenues] = useState({});

    useEffect(() => {
        const venueObj = (concerts) => {
            return concerts.reduce((venObj, concert) => {
                const venueName = concert.venueName;
                if (venObj[venueName]) {
                    venObj[venueName].push(concert);
                } else {
                    venObj[venueName] = [concert];
                }
                return venObj;
            }, {});
        };

        if (user.id) {
            setFriends(user.friends);
            setVenues(venueObj(user.concerts));
            getUserLocation();
        }
    }, [user.id]);
    console.log('venues', venues);
    return (
        <>
            <p>See {user.id ? user.firstName : 'User'}'s events</p>
            <p>Friends:</p>
            <ul>
                {friends.map((friend) =>
                    friend.friendship.status === 'accepted' ? (
                        <li key={friend.id}>
                            <Link to={`/user/${friend.id}`}>
                                {friend.firstName}
                            </Link>
                        </li>
                    ) : (
                        <div key={friend.id}></div>
                    )
                )}
            </ul>
            <p>Upcoming Concerts:</p>
            <ul>
                {concerts.map((concert) => (
                    <li
                        key={concert.id}
                    >{`${concert.name} (${concert.date})`}</li>
                ))}
            </ul>

            {/*TO DO: USER LOADING SCREEN */}
            <LoadScript googleMapsApiKey={REACT_APP_GOOGLEAPIKEY}>
                <GoogleMap
                    zoom={10}
                    center={{ lat: userLocation.lat, lng: userLocation.lon }}
                    mapContainerStyle={{ height: '50vh', width: '50vw' }}
                >
                    {venues
                        ? Object.keys(venues).map((venue, idx) => {
                              if (venues[venue][0].lat) {
                                  return (
                                      <Marker
                                          key={venues[venue][0].id}
                                          //   onClick={() =>
                                          //       onMarkerPopup(
                                          //           venueDataObj[currEvent]
                                          //       )
                                          //   }
                                          position={{
                                              lat: +venues[venue][0].lat,
                                              lng: +venues[venue][0].lon,
                                          }}
                                      />
                                  );
                              }
                          })
                        : null}

                    {/* {state.isOpen && (
                        <InfoWindow
                            position={{
                                lat: state.selectedEventLat,
                                lng: state.selectedEventLong,
                            }}
                        >
                            <div>
                                <Link to={`/venue/${singleVenue.venueData.id}`}>
                                    {state.selectedEventName}
                                </Link>
                            </div>
                        </InfoWindow>
                    )} */}
                </GoogleMap>
            </LoadScript>
        </>
    );
};

export default Dashboard;
