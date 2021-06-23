import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';
import { makeStyles } from '@material-ui/core';

import { GlobalState } from '../../contexts/Store';
import personalizedMarkerIcon from '../Map/personalizedMarkerIcon';
import Header from './Header';
import FriendsList from '../User/FriendsList';
import ContainedButton from '../StyledComponents/ContainedButton';
import UpcomingEvents from '../Concerts/UpcomingEvents';

const useStyles = makeStyles((theme) => ({
    outerContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '90vh',
        overflowY: 'scroll',
    },

    lowerContainer: {
        display: 'flex',
    },

    right: {
        display: 'flex',
        flexDirection: 'column',
        flex: '2',
        marginLeft: '.5rem',
        marginRight: '1rem',
    },

    map: {
        display: 'flex',
        justifyContent: 'center',
    },
    friends: {
        display: 'flex',
        backgroundColor: '#382B71',
        marginTop: '1.5rem',
        alignItems: 'center',
    },

    list: {
        flex: '2',
    },

    button: {
        display: 'flex',
        flex: '1',
        alignItems: 'center',
        justifyContent: 'center',
        '& *': {
            textDecoration: 'none',
        },
    },
    verticalLine: {
        borderLeft: '0.1rem solid white',
        height: '75%',
        margin: '1rem',
    },
}));

const compareDate = (dateOne, dateTwo) => {
    const d1 = Date.parse(dateOne.date);
    const d2 = Date.parse(dateTwo.date);
    return d1 - d2;
};

const Dashboard = () => {
    const classes = useStyles();

    const { auth, getUserData, location, getUserLocation, googleInformation } =
        useContext(GlobalState);

    const [user, setUser] = auth;
    const [userLocation, setLocation] = location;
    const [numConcerts, setNumConcerts] = useState(0);
    const [friends, setFriends] = useState([]);
    const [concerts, setConcerts] = useState([]);
    const [venues, setVenues] = useState({});
    const [text, setText] = useState('Upcoming Concerts');
    const [googleInfo, setGoogleInfo] = googleInformation;

    const [markerState, setMarkerState] = useState({
        isOpen: false,
        selectedEventLat: 0,
        selectedEventLong: 0,
        selectedVenueName: '',
    });

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
            const userFriends = user.friends.slice(0, 3);
            setFriends(userFriends);
            setVenues(venueObj(user.concerts));
            setNumConcerts(user.concerts.length);

            getUserLocation();
            setConcerts(user.concerts.sort(compareDate));
        }
    }, [user.id]);

    const onMarkerPopup = (
        selectedEventLat,
        selectedEventLong,
        selectedVenueName,
        concerts
    ) => {
        setConcerts(concerts.sort(compareDate));
        setNumConcerts(concerts.length);
        setText(`Upcoming Concerts At ${selectedVenueName}`);
        setMarkerState({
            ...markerState,
            selectedEventLat,
            selectedEventLong,
            selectedVenueName,
            isOpen: true,
        });
    };

    const onMapClick = () => {
        setMarkerState({ ...markerState, isOpen: false });
        setNumConcerts(user.concerts.length);
        setConcerts(user.concerts.sort(compareDate));
        setText('Upcoming Concerts');
    };
    const numOfFriends = user.friends ? user.friends.length : 0;

    return googleInfo.GOOGLE_MAP_KEY.length ? (
        <div className={classes.outerContainer}>
            <Header userInfo={user} /> {/*Upper Div*/}
            <div className={classes.lowerContainer}>
                <UpcomingEvents concerts={concerts} friends={user.friends} />
                <div className={classes.right}>
                    <div className={classes.map}>
                        <LoadScript
                            googleMapsApiKey={googleInfo.GOOGLE_MAP_KEY}
                            mapIds={googleInfo.GOOGLE_MAP_ID}
                        >
                            <GoogleMap
                                onClick={onMapClick}
                                zoom={10}
                                center={{
                                    lat: userLocation.lat,
                                    lng: userLocation.lon,
                                }}
                                mapContainerStyle={{
                                    height: '60vh',
                                    width: '75vw',
                                }}
                                options={{
                                    mapTypeControl: false,
                                    fullscreenControl: false,
                                    mapId: googleInfo.GOOGLE_MAP_ID,
                                }}
                            >
                                {venues
                                    ? Object.keys(venues).map((venue, idx) => {
                                          if (venues[venue][0].lat) {
                                              return (
                                                  <Marker
                                                      key={venues[venue][0].id}
                                                      onClick={() =>
                                                          onMarkerPopup(
                                                              venues[venue][0]
                                                                  .lat,
                                                              venues[venue][0]
                                                                  .lon,
                                                              venue,
                                                              venues[venue]
                                                          )
                                                      }
                                                      position={{
                                                          lat: +venues[venue][0]
                                                              .lat,
                                                          lng: +venues[venue][0]
                                                              .lon,
                                                      }}
                                                      icon={
                                                          personalizedMarkerIcon
                                                      }
                                                  />
                                              );
                                          }
                                      })
                                    : null}

                                {markerState.isOpen && (
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
                                )}
                            </GoogleMap>
                        </LoadScript>
                    </div>
                    <div className={classes.friends}>
                        <div className={classes.list}>
                            <FriendsList
                                friends={friends}
                                friendNum={numOfFriends}
                            />
                        </div>
                        <div className={classes.verticalLine}></div>
                        <div className={classes.button}>
                            <Link to="/friends">
                                <ContainedButton>
                                    View All Friends
                                </ContainedButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default Dashboard;
