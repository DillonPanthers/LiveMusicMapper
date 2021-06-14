import axios from 'axios';

/* Grabs events from ticketmaster to populate venue data for the markers */
export const getEvents = async (user, state, radius, TICKETMASTERAPIKEY) => {
    try {
        /* In guest view, guest user will see all events in his/her area */
        const latlong = state.lat + ',' + state.lon;
        let { artists, recommendedArtists, ticketmasterGenres, spotifyId } =
            user;
        console.log('user:', user);

        /* Regular & guest users see all events */
        if (!spotifyId) {
            const {
                data: {
                    _embedded: { events },
                },
            } = await axios.get(
                `https://app.ticketmaster.com/discovery/v2/events.json?segmentName=music&size=200&latlong=${latlong}&radius=${radius}&apikey=${TICKETMASTERAPIKEY}`
            );
            return events;
        } else {
            console.log('start');
            /* In auth view, logged-in user will see events tailored to his/her spotify music taste */
            if (Object.keys(artists).length) {
                let events = await callTicketmasterApi(
                    artists,
                    'keyword',
                    latlong,
                    TICKETMASTERAPIKEY,
                    radius
                );
                /* if no events are generated from top artists, search through recommended artists*/
                if (!events.length) {
                    events = await callTicketmasterApi(
                        recommendedArtists,
                        'keyword',
                        latlong,
                        TICKETMASTERAPIKEY,
                        radius
                    );
                }

                /* if no events are generated from recommended artists, search genres */
                if (!events.length) {
                    events = await callTicketmasterApi(
                        ticketmasterGenres,
                        'classificationName',
                        latlong,
                        TICKETMASTERAPIKEY,
                        radius
                    );
                }
                console.log('end - events:', events);
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
    /* convert object to an array that can be mapped over for handling spaces in strings*/
    let array = Object.keys(object).map((string) =>
        string.split(' ').join('%')
    );
    console.log(array);

    let events = [];

    /*
    // REVISED PROMISE.ALL
    if (array.length) {
        let tmEvents = await Promise.all(
            array.map(async (name, idx) => {
                if (idx % 4 === 0 && idx !== 0) await sleep(1000); // this step is critical for pausing API calls
                const response = await axios.get(
                    `https://app.ticketmaster.com/discovery/v2/events.json?segmentName=music&${parameterType}=${name}&size=200&latlong=${latlong}&radius=${radius}&apikey=${TICKETMASTERAPIKEY}`
                );
                console.log(response.data);
                return response.data;
            })
        );
        console.log(1); // doesn't print
        events = tmEvents
            .filter((data) => data._embedded) // checks if there is event data
            .map((data) => data._embedded.events[0]);
        console.log('events', events);
    }
    */

    // WORKING CODE
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
