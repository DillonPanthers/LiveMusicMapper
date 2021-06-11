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

//TODO: Sort the dates of the upcoming concerts, maybe use a util function. 
//TODO: Use avatars as a grid to show some friends, and a link to all friends 

//TODO: On all friends page we can have all friends, and on a sidebar/side component a view of pending friend requests, and the search component there. If no friend requests, then display message no friends. 

//maybe move to utils folder later

const compareDate = (dateOne, dateTwo) =>{
    // console.log(dateOne.date, 'first date here')
    const d1 = Date.parse(dateOne.date);
    const d2 = Date.parse(dateTwo.date);
    console.log('d1', d1);
    console.log('d2', d2);
    return d1-d2; 
}

const Dashboard = () => {
    const { auth, getUserData, location, getUserLocation } =
        useContext(GlobalState);

    const [user, setUser] = auth;
    const [userLocation, setLocation] = location;
    const [numConcerts, setNumConcerts] = useState(0);
    const [friends, setFriends] = useState([]);
    const [concerts, setConcerts] = useState([]);
    const [venues, setVenues] = useState({});
    const [text, setText] = useState("Upcoming Concerts")
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
            setFriends(user.friends);
            setVenues(venueObj(user.concerts));
            setNumConcerts(user.concerts.length);
            getUserLocation();
            setConcerts(user.concerts.sort(compareDate))
        }
    }, [user.id]);

    const onMarkerPopup = (selectedEventLat, selectedEventLong, selectedVenueName, concerts )=>{
        setConcerts(concerts.sort(compareDate));
        setNumConcerts(concerts.length);
        setText(`Upcoming Concerts At ${selectedVenueName}`)
        setMarkerState({...markerState,selectedEventLat,selectedEventLong, selectedVenueName, isOpen: true})
    }

    const onMapClick = ()=>{
        setMarkerState({...markerState, isOpen: false})
        setNumConcerts(user.concerts.length);
        setConcerts(user.concerts.sort(compareDate));
        setText("Upcoming Concerts")
      //  console.log(event.target,'on page click');
    }

    console.log('venues', venues);
    return (
        <div style={{display:"flex"}}>
            {/*TO DO: USER LOADING SCREEN*/}
            <div style={{marginRight: '10px'}}>
            <LoadScript googleMapsApiKey={REACT_APP_GOOGLEAPIKEY}>
                <GoogleMap
                onClick ={onMapClick}
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
                            <div style = {{color:"black"}}>
                                {/* <Link to={`/venue/${singleVenue.venueData.id}`}> */}
                                    {markerState.selectedVenueName}
                                {/* </Link> */}
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
            </div>
            <div>
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
            <p>{`${text} (${numConcerts})`}</p>
            <ul>
                {concerts.map((concert) => (
                    <li
                        key={concert.id}
                    >{`${concert.name} (${concert.date})`}</li>
                ))}
            </ul>
            </div>
            </div>
    );
};

export default Dashboard;
