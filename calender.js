const {google} = require('googleapis');
require('dotenv').config();

// Provide the required configuration
const CREDENTIALS = {
    "type": "service_account",
    "project_id": "tranquil-rite-324112",
    "private_key_id": "071a578f735e144e9b02e48d8d6b93d2144ac419",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDOWsELG6f+Lusf\n1BYLsKI6r2RnR8DzLvXA1Adgk9dXCcfYe1mMEWy5kx+L37tnf4wEqUklhiqk63Rw\nVrKsPoCRoaMZ9qjYkASz212eBLowBtpkUySYqeId2KPvJtVgJdtmR6grPZgfly8a\n4A6mx5xAYk6tx4q4DVCxG+fAmRJXoSymrhJEAZwgXB0/QVc5MB/2lRX9OpZnTg+G\ncmkzRcqiSyNZpgSXfy03gUQJenW8UbXRVPJkQlXu49VF67fixtrP6Gnt7CZ7Tscu\nZriYRyb3i6AWpgv9MQfl/1XOoRh6UaqurGFTbxBfAily8VKzBXf2Di11a18YXLmE\n7e6iIjOhAgMBAAECggEADL933t3N2lq/qm8JuvMl3TDp/PoRJh99OHULd6CVKbVa\n+TlgO3z1azQhkMc45piZ580leFdPhHIJ9slZrwu1bvRor7lDOQ28nKKCqA5sCieC\nOmHAiFsxCDL9Uvrigla/CmncLmpXCYHne7uNFtSMserg0sTZrFZ2PlrA+G78aRlZ\nVJcXOU6n0gksD0o8QW340F6v4+GBk9QamLR+LpmuiroS9DWlMkTiK5v3iAofAQY2\npR5HxOvVFXMYXNplt7QiQxcyjUA2eiPRFwvuIrRa6mq2xFHviNduKXtsbTooAZ8x\n+iKFkuoqqfkWnUjfORaua0lDgHI8++tiHi/VHI1/+QKBgQD/y1Yezs+WIHb93NZ2\nu/rPjyDcDCjH9YPOnJQlgtuBhlO72pVEzJA7ZM+Xf0bW+RJcSJJtYNIyPaXTNYuj\nJklIPJoLzA6uZFA3kTHgnktKyw+o9Y5MM60RFgJPC17s/4C1Qw+YCsYYwA/eMGSQ\nGMa6rR+1W2s5nmaC+6VWfdW3OwKBgQDOhT0nJ8Q5zhc8x1Ck0gyplHaybGhXG2UZ\niGyPyrpOOeYZaNrJqYAYMahpjpuML0uCzYnZ1c+IfD5bbuudutBSl8Q1zg6jO6ZM\nJ9PxD13vDVBYezce69oa7DcpimX2+FvL5ioFF/JXbXk7uUmTuuDPSV+EmPEs+EYB\n/2bSHv2q0wKBgQDxnE/hU7lSdaHPklvk1RRIH0qLbtTKYwY4D0AD2oGZ65aF9yZN\nUOffog5PbAIuph8Imeftdqm0mPRb9tTJqy1HFS7we7NWWBxJEFVLdFlr8Tf+gMsD\nAUC0xdQyc2wbcg9Rp2FAXNTWpfuXBKDIVw7HXyV3OT2jtBHiIO4AL2XB5wKBgQCg\nEyp5ZRt16sacN6nMd3uVHhx65AhkLDnK9rGfKvYJmFtAKsQbN6SwHB175CuxFx+i\nfYpyLIY2Nodm+6zpj1nWCwjs45D4+U1HDj/7Q3v9xQYX7zmkYA+oepuvOTUbnxoY\nC4ladVtEZPhpUI81UM7cHPVKo/mcb7xj5AFgsODSPQKBgQCGUUrW8W6LN371BHmN\nCx6LsT18te2PGR8D3aKyqUTbblVpp/4DvvvnVakroYcUewTJz3bGOv9CR8Nr1TFW\ntsuJ9H18BC06jk9mWZDEAvzh7+ip31T0Cg4Wp7OdUQ5HZE2+HxYH9pYTMY2SL0db\n9Hawqyfdi0KicBzcR54kVcIdMw==\n-----END PRIVATE KEY-----\n",
    "client_email": "googlecalenderapiprojecth8@tranquil-rite-324112.iam.gserviceaccount.com",
    "client_id": "113173590809617295763",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/googlecalenderapiprojecth8%40tranquil-rite-324112.iam.gserviceaccount.com"
};
const calendarId = "lf2d4dfm1ged9d3v782e41ljd4@group.calendar.google.com";

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({version : "v3"});

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

// Your TIMEOFFSET Offset
const TIMEOFFSET = '+07:00';

// Get date-time string for calender
const dateTimeForCalander = (tanggal) => {

    let date = new Date(tanggal);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

    let event = new Date(Date.parse(newDateTime));

    let startDate = event;
    // Delay in end time is 1
    let endDate = new Date(new Date(startDate).setHours(startDate.getHours()+1));

    return {
        'start': startDate,
        'end': endDate
    }
};

console.log(dateTimeForCalander());

// Insert new event to Google Calendar
const insertEvent = async (event) => {

    try {
        let response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: event
        });
    
        if (response['status'] == 200 && response['statusText'] === 'OK') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`);
        return 0;
    }
};

// TODO PENTING
// let dateTime = dateTimeForCalander();

// // Event for Google Calendar
// let event = {
//     'summary': `appointment`,
//     'description': `appointment`,
//     'start': {
//         'dateTime': dateTime['start'],
//         'timeZone': 'Asia/Jakarta'
//     },
//     'end': {
//         'dateTime': dateTime['end'],
//         'timeZone': 'Asia/Jakarta'
//     }
// };

// insertEvent(event)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// Get all the events between two dates
const getEvents = async (dateTimeStart, dateTimeEnd) => {

    try {
        let response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            timeMin: dateTimeStart,
            timeMax: dateTimeEnd,
            timeZone: 'Asia/Kolkata'
        });
    
        let items = response['data']['items'];
        return items;
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        return 0;
    }
};

// let start = '2020-10-03T00:00:00.000Z';
// let end = '2020-10-04T00:00:00.000Z';

// getEvents(start, end)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// Delete an event from eventID
const deleteEvent = async (eventId) => {

    try {
        let response = await calendar.events.delete({
            auth: auth,
            calendarId: calendarId,
            eventId: eventId
        });

        if (response.data === '') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at deleteEvent --> ${error}`);
        return 0;
    }
};

let eventId = 'hkkdmeseuhhpagc862rfg6nvq4';

// deleteEvent(eventId)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
module.exports = {insertEvent, dateTimeForCalander}