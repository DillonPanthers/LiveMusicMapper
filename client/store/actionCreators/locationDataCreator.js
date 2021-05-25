import { FETCH_USER_LOCATION, FETCH_TICKET_DATA } from '../actions/index';
import axios from 'axios';

// export const getUserLocation= ()=>{

//     return async(dispatch)=>{
//
//     }
// }

//if we have user location in frontend, do we really need to store it in the backend?

export const fetchStudentData = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/students');
    dispatch({ type: 'FETCH_STUDENTS', payload: response.data });
  };
};

//   $.ajax({
//     type: 'GET',
//     url:
//       `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=CA&apikey={TICKETMASTERAPIKEY}=`,
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
