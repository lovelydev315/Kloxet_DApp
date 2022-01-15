import http from "./httpService";
import config from "../config.json";

export function getBOMForUser (username) {
    return http.get(config.apiEndPoint + '/get-bom/' + username);
}

export function postBOMItemComment (payload, username) {
    return http.post(config.apiEndPoint + '/update-bom/' + username, payload);
}

export function getMonthName(monthNumber) {
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const monthName = monthNames[parseInt(monthNumber) - 1];
    return  monthName ? monthName : 'Unknown';
}

export default {
    getBOMForUser,
    postBOMItemComment,
    getMonthName
};
