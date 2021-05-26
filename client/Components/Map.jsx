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
      console.log('geo location', position)
      this.setState({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
    });
    // const ticketDataByLocation = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&lat=${this.state.lat}&long=${this.state.lon}&apikey=${TICKETMASTERAPIKEY}`)
    const ticketDataByLocation = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=345&size=200&apikey=${TICKETMASTERAPIKEY}`)
    console.log('ticket by location', ticketDataByLocation)

    this.setState({ticketDataByLocation: ticketDataByLocation.data._embedded.events})

  }

  render() {

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
              {this.state.ticketDataByLocation.map((currEvent) => {
               return <Marker key={currEvent.id}
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
