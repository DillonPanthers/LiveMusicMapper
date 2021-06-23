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

const useStyles = makeStyles((theme) => ({
    outerContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '90vh',
        border: '1px solid white',
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
            setFriends(user.friends);
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
    return googleInfo.GOOGLE_MAP_KEY.length ? (
        <div className={classes.outerContainer}>
            <Header userInfo={user} />
            <div style={{ display: 'flex' }}>
                {/*TO DO: USER LOADING SCREEN*/}
                <div style={{ marginRight: '10px' }}></div>
                <div>
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
        </div>
    ) : (
        <></>
    );
};

export default Dashboard;
