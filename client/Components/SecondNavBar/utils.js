import axios from 'axios';

/* Grabs all events from ticketmaster to populate venue data for the markers */
export const getEvents = async (
    locationData,
    radius,
    TICKETMASTERAPIKEY,
    genre
) => {
    try {
        const latlong = locationData.lat + ',' + locationData.lon;
        const genreId = genre.length ? `genreId=${genre}&` : '';
        // console.log('SecondNavBar - utils, genre:', genre);

        const {
            data: {
                _embedded: { events },
            },
        } = await axios.get(
            `https://app.ticketmaster.com/discovery/v2/events.json?segmentName=music&size=200&latlong=${latlong}&radius=${radius}&${genreId}apikey=${TICKETMASTERAPIKEY}`
        );
        return events;
    } catch (error) {
        console.log(error);
    }
};

export const getTopArtistsEvents = async (
    user,
    locationData,
    radius,
    TICKETMASTERAPIKEY
) => {
    try {
        let { artists } = user;
        let events = [];
        const latlong = locationData.lat + ',' + locationData.lon;
        if (Object.keys(artists).length) {
            events = await callTicketmasterApi(
                artists,
                'keyword',
                latlong,
                TICKETMASTERAPIKEY,
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
    radius,
    TICKETMASTERAPIKEY
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
                TICKETMASTERAPIKEY,
                radius
            );
        }
        return events;
    } catch (error) {
        console.log(error);
    }
};

export const getTopGenresEvents = async (
    user,
    locationData,
    radius,
    TICKETMASTERAPIKEY
) => {
    try {
        let { ticketmasterGenres } = user;
        let events = [];
        const latlong = locationData.lat + ',' + locationData.lon;
        if (Object.keys(ticketmasterGenres).length) {
            events = await callTicketmasterApi(
                ticketmasterGenres,
                'classificationName',
                latlong,
                TICKETMASTERAPIKEY,
                radius
            );
        }
        return events;
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
    let array = Object.keys(object);
    console.log(array);
    let events = [];

    if (array.length) {
        for (let i = 0; i < array.length; i++) {
            let name = array[i];
            if (i % 5 === 0) await sleep(1000);
            console.log('name & index', name, i);
            const { data } = await axios.get(
                `https://app.ticketmaster.com/discovery/v2/events.json?segmentName=music&${parameterType}=${name}&size=200&latlong=${latlong}&radius=${radius}&apikey=${TICKETMASTERAPIKEY}`
            );
            if (data._embedded) events.push(data._embedded.events[0]);
        }
    }
    console.log(events);
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

// prints out current time based on seconds
const getTime = () => {
    return (new Date().getTime() % 60000) / 1000;
};
// defers a function for 1 second
const sleep = (ms) => {
    console.log(getTime());
    return new Promise((accept) => {
        setTimeout(() => {
            accept();
        }, ms);
    });
};
