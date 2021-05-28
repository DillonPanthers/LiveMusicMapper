import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { TICKETMASTERAPIKEY, REACT_APP_GOOGLEAPIKEY } from "../secret";
import { Link } from "react-router-dom";
import axios from "axios";
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lon: 0,
      ticketDataByLocation: [],
      selectedEventLat: 0,
      selectedEventLong: 0,
      selectedEventName: "",
      selectedEventDate: "",
      selectedEventAddress: "",
      selectedEventGenre: "",
      selectedEventSubGenre: "",
      isOpen: false,
    };
    this.onMarkerPopup = this.onMarkerPopup.bind(this);
  }
  async componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("geo location", position);
      this.setState({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
    // const ticketDataByLocation = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&lat=${this.state.lat}&long=${this.state.lon}&apikey=${TICKETMASTERAPIKEY}`)
    const ticketDataByLocation = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=345&size=200&apikey=${TICKETMASTERAPIKEY}`
    );
    console.log("ticket by location", ticketDataByLocation);

    this.setState({
      ticketDataByLocation: ticketDataByLocation.data._embedded.events,
    });
  }

  onMarkerPopup(event) {
    console.log(event, "here event");

    const selectedEventLat = +event._embedded.venues[0].location.latitude;
    const selectedEventLong = +event._embedded.venues[0].location.longitude;
    const selectedEventName = event.name;
    const selectedEventDate = event.dates.start.localDate;
    const selectedEventAddress = event._embedded.venues[0].address.line1;
    const selectedEventGenre = event.classifications[0].genre.name;
    const selectedEventSubGenre = event.classifications[0].subGenre.name;
    this.setState({
      selectedEventLat,
      selectedEventLong,
      selectedEventName,
      selectedEventDate,
      selectedEventAddress,
      selectedEventGenre,
      selectedEventSubGenre,
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    //TODO: Have a selectedMarker field in the state that we will check the coordinates of in order decide what the infowindow will show
    return (
      <LoadScript googleMapsApiKey={REACT_APP_GOOGLEAPIKEY}>
        <GoogleMap
          zoom={10}
          center={{ lat: this.state.lat, lng: this.state.lon }}
          mapContainerStyle={{ height: "100vh", width: "100vw" }}
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

          {this.state.isOpen ? (
            <InfoWindow
              position={{
                lat: this.state.selectedEventLat,
                lng: this.state.selectedEventLong,
              }}
            >
              <div>
                <Link to="/event">{this.state.selectedEventName}</Link>
                <br></br>
                <p>Start Date: {this.state.selectedEventDate}</p>
                <p>Concert Address: {this.state.selectedEventAddress}</p>
                <p>
                  Genres: {this.state.selectedEventGenre},{" "}
                  {this.state.selectedEventSubGenre}
                </p>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default Map;
