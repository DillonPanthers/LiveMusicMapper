const buildDescription =
    'To build this application, we learned how to combine multiple APIs - Google Maps, Ticketmaster, and Spotify - with a NERP stack. \nTo generate personalized event recommendations for users, we connected the data between the Ticketmaster and Spotify APIs by using a fuzzy string matching library (based on the Levenshtein Distance algorithm) to measure the difference between two similar genre names. \nWorking within the constraints of the APIs, we had to be cautious of data fetching limits, the number of authorized users, and following design guidelines. We plan to get official approval from both Ticketmaster and Spotify to increase our number of users so that Live Music Mapper can be released to a wider audience.';

export default buildDescription;
