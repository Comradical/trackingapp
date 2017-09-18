import axios from 'axios';

const API_KEY = '746f64e9e3feaef3bd8ac709f506338a';
const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
    const url = `${ROOT_URL}&q=${city},us`;
    const request = axios.get(url);
    
    console.log("request:", request);
    
    return {
        type: FETCH_WEATHER,
        payload: request
    };
}