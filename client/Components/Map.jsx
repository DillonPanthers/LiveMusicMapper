import React from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { TICKETMASTERAPIKEY, REACT_APP_GOOGLEAPIKEY } from '../secret';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
    this.onMarkerPopup = this.onMarkerPopup.bind(this);
  }
  async componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('geo location', position);
      this.setState({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }

  onMarkerPopup(event) {
    console.log(event, 'here event');

    const selectedEventLat = +event._embedded.venues[0].location.latitude;
    const selectedEventLong = +event._embedded.venues[0].location.longitude;
    const selectedEventName = event.name;
    const selectedEventDate = event.dates.start.localDate;
    const selectedEventVenue = event._embedded.venues[0].name;
    const selectedEventGenre = event.classifications[0].genre.name;
    const selectedEventSubGenre = event.classifications[0].subGenre.name;
    this.setState({
      selectedEventLat,
      selectedEventLong,
      selectedEventName,
      selectedEventDate,
      selectedEventVenue,
      selectedEventGenre,
      selectedEventSubGenre,
      isOpen: !this.state.isOpen,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.lat !== this.state.lat && prevState.lon !== this.state.lon) {
      const latlong = this.state.lat + ',' + this.state.lon;
      const ticketDataByLocation = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&size=200&latlong=${latlong}&apikey=${TICKETMASTERAPIKEY}`
      );
      this.setState({
        ticketDataByLocation: ticketDataByLocation.data._embedded.events,
      });
    }
  }

  render() {
    //TODO: Have a selectedMarker field in the state that we will check the coordinates of in order decide what the infowindow will show
    //TODO: Change font color for info window since I believe the font color is white thats why the rest of the details are currently not being shown but they are there don't worry!
    return (
      <LoadScript googleMapsApiKey={REACT_APP_GOOGLEAPIKEY}>
        <GoogleMap
          zoom={10}
          center={{ lat: this.state.lat, lng: this.state.lon }}
          mapContainerStyle={{ height: '100vh', width: '100vw' }}
        >
          <Marker
            position={{
              lat: this.state.lat,
              lng: this.state.lon,
            }}
          />

          {this.state.ticketDataByLocation.map((currEvent) => {
            return (
              <Marker
                key={currEvent.id}
                onClick={() => this.onMarkerPopup(currEvent)}
                position={{
                  lat: +currEvent._embedded.venues[0].location.latitude,
                  lng: +currEvent._embedded.venues[0].location.longitude,
                }}
              />
            );
          })}

          {this.state.isOpen && (
            <InfoWindow
              position={{
                lat: this.state.selectedEventLat,
                lng: this.state.selectedEventLong,
              }}
            >
              <div>
                <Link to='/event'>{this.state.selectedEventName}</Link>
                <p>Start Date: {this.state.selectedEventDate}</p>
                <p>Venue: {this.state.selectedEventVenue}</p>
                <p>
                  Genres: {this.state.selectedEventGenre},{' '}
                  {this.state.selectedEventSubGenre}
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default Map;
