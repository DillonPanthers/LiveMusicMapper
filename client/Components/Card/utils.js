export const getDateInStringFormat = (date) => {
    const year = date.slice(0, 4);
    const day = date.slice(-2);
    let month = date.slice(5, 7);

    if (month === '01') month = 'January';
    if (month === '02') month = 'February';
    if (month === '03') month = 'March';
    if (month === '04') month = 'April';
    if (month === '05') month = 'May';
    if (month === '06') month = 'June';
    if (month === '07') month = 'July';
    if (month === '08') month = 'August';
    if (month === '09') month = 'September';
    if (month === '10') month = 'October';
    if (month === '11') month = 'November';
    if (month === '12') month = 'December';
    return `${month} ${day}, ${year}`;
};

export const getConcertImage = (concertData) => {
    const { images } = concertData;
    for (let image of images) {
        if (image.ratio === '16_9' && image.width > 500) return image.url;
    }
    return 'https://mspmag.com/downloads/51225/download/shutterstock_696332926.jpg?cb=5b21ba3e87f20324f36e2a2e13fe438c&w=1280';
};
