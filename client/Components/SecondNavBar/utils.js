import axios from 'axios';

export const getEvents = async (locationData, radius, TICKETMASTERAPIKEY) => {
    try {
        /* In guest view, guest user will see all events in his/her area */
        const latlong = locationData.lat + ',' + locationData.lon;
        const {
            data: {
                _embedded: { events },
            },
        } = await axios.get(
            `https://app.ticketmaster.com/discovery/v2/events.json?segmentName=music&size=200&latlong=${latlong}&radius=${radius}&apikey=${TICKETMASTERAPIKEY}`
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

export const getTopGenres = async (
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
