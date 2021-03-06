import axios from 'axios';

/* Grabs all events from ticketmaster to populate venue data for the markers */
export const getEvents = async (locationData, radius, genre) => {
    try {
        const latlong = locationData.lat + ',' + locationData.lon;
        const genreId = genre.length ? `genreId=${genre}&` : '';

        const { data } = await axios.get('/api/ticketmaster/genres', {
            params: { latlong, radius, genreId },
        });

        return data._embedded ? data._embedded.events : [];
    } catch (error) {
        console.log(error);
    }
};

export const getTopArtistsEvents = async (user, locationData, radius) => {
    try {
        let { artists } = user;
        let events = [];
        const latlong = locationData.lat + ',' + locationData.lon;
        if (Object.keys(artists).length) {
            events = await callTicketmasterApi(
                artists,
                'keyword',
                latlong,
                radius
            );
        }
        return events;
    } catch (error) {
        console.log(error);
    }
};

export const getRecommendedArtistsEvents = async (
    user,
    locationData,
    radius
) => {
    try {
        let { recommendedArtists } = user;
        let events = [];
        const latlong = locationData.lat + ',' + locationData.lon;
        if (Object.keys(recommendedArtists).length) {
            events = await callTicketmasterApi(
                recommendedArtists,
                'keyword',
                latlong,
                radius
            );
        }
        return events;
    } catch (error) {
        console.log(error);
    }
};

export const getTopGenresEvents = async (user, locationData, radius) => {
    try {
        let { ticketmasterGenres } = user;
        let events = [];
        const latlong = locationData.lat + ',' + locationData.lon;
        if (Object.keys(ticketmasterGenres).length) {
            events = await callTicketmasterApi(
                ticketmasterGenres,
                'classificationName',
                latlong,
                radius
            );
        }
        return events;
    } catch (error) {
        console.log(error);
    }
};

const callTicketmasterApi = async (object, parameterType, latlong, radius) => {
    let array = Object.keys(object);
    let events = [];

    while (array.length) {
        const subArray = array.splice(0, 4);
        for (let i = 0; i < subArray.length; i++) {
            let name = subArray[i];
            await sleep(150);
            const { data } = await axios.get('/api/ticketmaster/spotify-user', {
                params: { parameterType, name, latlong, radius },
            });
            if (data._embedded) events.push(data._embedded.events[0]);
        }
    }

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
export const getVenueObject = (eventObj) => {
    if (eventObj) {
        return eventObj.reduce((venObj, concert) => {
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
    }
    return {};
};
// prints out current time based on seconds
const getTime = () => {
    return (new Date().getTime() % 60000) / 1000;
};
// defers a function for 1 second
const sleep = (ms) => {
    return new Promise((accept) => {
        setTimeout(() => {
            accept();
        }, ms);
    });
};
