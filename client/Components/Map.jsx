import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {TICKETMASTERAPIKEY, REACT_APP_GOOGLEAPIKEY} from '../secret'
import axios from 'axios'
class Map extends React.Component{
  constructor(){
    super()
    this.state={
      lat: 0,
      lon: 0,
      ticketDataByLocation: []
    }
  }
  async componentDidMount(){
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      this.setState({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
    });
    // const latlong = this.state.lat +","+this.state.lon;
    console.log(typeof latlong, "latitude longitude here SIR")
    const ticketDataByLocation = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&lat=${this.state.lat}&long=${this.state.lon}&apikey=${TICKETMASTERAPIKEY}`)
    console.log("ticket data here", ticketDataByLocation)


    this.setState({ticketDataByLocation: ticketDataByLocation.data._embedded.events})
    console.log(this.state.ticketDataByLocation, 'componentdidmount check for ticket data')
//   $.ajax({
//     type: 'GET',
//     url:
//       `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=CA&apikey={TICKETMASTERAPIKEY}`,
//       // latlon,
//     async: true,
//     dataType: 'json',
//     success: function (json) {
//       console.log(json);
//       var e = document.getElementById('events');
//       e.innerHTML = json.page.totalElements + ' events found.';
//       showEvents(json);
//       initMap(position, json);
//     },
//     error: function (xhr, status, err) {
//       console.log(err);
//     },
//   });
//   return latlon
// }



// function showEvents(json) {
//   for (var i = 0; i < json.page.size; i++) {
//     $('#events').append('<p>' + json._embedded.events[i].name + '</p>');
//   }
// }

// function initMap(position, json) {
//   var mapDiv = document.getElementById('map');
//   var map = new google.maps.Map(mapDiv, {
//     center: { lat: position.coords.latitude, lng: position.coords.longitude },
//     zoom: 10,
//   });
//   for (var i = 0; i < json.page.size; i++) {
//     addMarker(map, json._embedded.events[i]);
//   }
// }

// function addMarker(map, event) {
//   var marker = new google.maps.Marker({
//     position: new google.maps.LatLng(
//       event._embedded.venues[0].location.latitude,
//       event._embedded.venues[0].location.longitude
//     ),
//     map: map,
//   });
//   marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
//   console.log(marker);
// }


  /////////

  







    // getLocation();
    // console.log('lat lon',latlon)
  }

  render() {
    console.log('state', this.state)
    // console.log(this.state.ticketDataByLocation,'ticket data in render method')
    return (
        <LoadScript googleMapsApiKey={REACT_APP_GOOGLEAPIKEY}>
        <GoogleMap
          zoom={10}
          center={{ lat: this.state.lat, lng: this.state.lon }}
          mapContainerStyle={{ height: '500px', width: '1000px' }}
        >
        <Marker
                position={{
                  lat: this.state.lat,
                  lng: this.state.lon,
                }} 
              />
              {this.state.ticketDataByLocation.map((currEvent, idx) => {
               return <Marker key={idx}
                position={{
                  lat: +currEvent._embedded.venues[0].location.latitude,
                  lng: +currEvent._embedded.venues[0].location.longitude,
                }} 
              />
                
              })}
        </GoogleMap>
      </LoadScript>
    );
  }
}


export default Map;
