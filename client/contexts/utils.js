import axios from 'axios';

/* convert object to an array that can be mapped over for handling spaces in strings*/
// NOTE: May need to adjust array length in spotify API calls
export const objectToArray = (object) =>
    Object.keys(object)
        .map((string) => string.split(' ').join('%'))
        .slice(0, 4);

/* Grabs events from ticketmaster to populate venue data for the markers */
export const getEvents = async (user, state, radius, TICKETMASTERAPIKEY) => {
    const latlong = state.lat + ',' + state.lon;
    let { id, artists, recommendedArtists, ticketmasterGenres } = user;

    try {
        /* In guest view, guest user will see all events in his/her area */
        if (!id) {
            const {
                data: {
                    _embedded: { events },
                },
            } = await axios.get(
                `https://app.ticketmaster.com/discovery/v2/events.json?segmentName=music&size=200&latlong=${latlong}&radius=${radius}&apikey=${TICKETMASTERAPIKEY}`
            );
            return events;
        } else {
            /* In auth view, logged-in user will see events tailored to his/her spotify music taste */
            // let parameterType;
            if (Object.keys(artists).length) {
                artists = {
                    'Harry Styles': 'placeholder',
                    ...artists,
                };

                let events = await callTicketmasterApi(
                    artists,
                    'keyword',
                    latlong,
                    TICKETMASTERAPIKEY,
                    radius
                );
                return events;
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const callTicketmasterApi = async (
    object,
    parameterType,
    latlong,
    TICKETMASTERAPIKEY,
    radius
) => {
    let array = objectToArray(object);
    let events = [];

    await Promise.all(
        array.map(async (name) => {
            const { data } = await axios.get(
                `https://app.ticketmaster.com/discovery/v2/events.json?segmentName=music&${parameterType}=${name}&size=200&latlong=${latlong}&radius=${radius}&apikey=${TICKETMASTERAPIKEY}`
            );
            if (data._embedded) events.push(data._embedded.events[0]);
        })
    );
    return events;
};

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
                venueEvents: [concert],
            };
        } else {
            venObj[venueName].venueEvents.push(concert);
        }
        return venObj;
    }, {});
