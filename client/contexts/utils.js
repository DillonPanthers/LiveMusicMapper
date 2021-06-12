import axios from 'axios';

/* convert object to an array that can be mapped over for handling spaces in strings*/
export const objectToArray = (object) =>
    Object.keys(object)
        .map((string) => string.split(' ').join('%'))
        .slice(0, 5);

export const getEvents = async (user, state, radius, TICKETMASTERAPIKEY) => {
    const latlong = state.lat + ',' + state.lon;

    let { id, artists, recommendedArtists, ticketmasterGenres } = user;

    try {
        if (!id) {
            const {
                data: {
                    _embedded: { events },
                },
            } = await axios.get(
                `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&size=200&latlong=${latlong}&radius=${radius}&apikey=${TICKETMASTERAPIKEY}`
            );
            return events;
        } else {
            let parameterType;

            if (Object.keys(artists).length) {
                artists = { 'Harry Styles': 'placeholder', ...artists };
                artists = objectToArray(artists);
                parameterType = 'keyword';
                let name = 'Harry%Styles';
                let url = `https://app.ticketmaster.com/discovery/v2/events.json?segmentName=music&${parameterType}=${name}&size=200&latlong=${latlong}&radius=${radius}&apikey=${TICKETMASTERAPIKEY}`;

                let ticketDataByLocation = await axios.get(url);
                return ticketDataByLocation;
            }
        }
    } catch (error) {
        console.log(error);
    }
};

/*

    let events = [];

              ticketDataByLocation = await Promise.all(
                array.map(async (name) => {
                    let { data } = await axios.get(
                        `https://app.ticketmaster.com/discovery/v2/events.json?segmentName=music&${parameterType}=${name}&size=200&latlong=${latlong}&radius=${radius}&apikey=${TICKETMASTERAPIKEY}`,
                        { header: name }
                    );
                    if (data._embedded) {
                        events.push(data._embedded);
                    }
                })
            );

*/

/*
 * In venueObj below, I am taking the data and setting up an object that has just the venues as the keys, and the values of each of the keys will also be an object with two keys, one being venueData which would be the data of the current venue, and the second being a venueEvents

 * Now that I have an object that would look something like
  {
     Barclays Center: { venueData: {data of venue details here}, venueEvents: {will be a set that has the concerts at this venue} }
  }

 * Below I am modifying those fields. For each of the events I am populating the concerts part of the venue in the object I already set up above.
 */
export const getVenueObject = (eventObj) =>
    eventObj.reduce((venObj, concert) => {
        const venueName = concert._embedded.venues[0].name;
        if (!venObj[venueName]) {
            // grab venue data set it as property of venObj
            const venueData = concert._embedded.venues[0];
            venObj[venueName] = {
                venueData,
                venueEvents: [],
            };
        } else {
            venObj[venueName].venueEvents.push(concert);
        }
        return venObj;
    }, {});
