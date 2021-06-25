export const convertTime = (time) => {
    time = time.split(':');

    var hours = Number(time[0]);
    var minutes = Number(time[1]);

    var timeValue;

    if (hours > 0 && hours <= 12) {
        timeValue = '' + hours;
    } else if (hours > 12) {
        timeValue = '' + (hours - 12);
    } else if (hours == 0) {
        timeValue = '12';
    }

    timeValue += minutes < 10 ? ':0' + minutes : ':' + minutes;
    timeValue += hours >= 12 ? ' pm' : ' am';
    return timeValue;
};

export const getWorkingImage = (imageArr) => {
    for (let image of imageArr) {
        if (image.ratio === '3_2' && image.width > 500) return image.url;
    }
};

export const displayAddress = (venue) => {
    const address = venue.address ? venue.address.line1 : '';
    const city = venue.city ? venue.city.name : '';
    const state = venue.state.stateCode
        ? venue.state.stateCode
        : venue.state.name
        ? venue.state.name
        : '';
    const country = venue.country ? venue.country.countryCode : '';
    const postalCode = venue.postalCode ? venue.postalCode : '';
    const location = `${address}, ${city}, ${state} ${postalCode} ${country}`;
    return location;
};
