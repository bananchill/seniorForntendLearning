import axios from "axios";

const apiUrl = 'https://hexlet.io/api/v2/';

export default class WeatherService {
    constructor() {}

    async getWeather(city) {
        try {
            const response = await axios.get(`${apiUrl}cities/${city}`, {})
            console.log(response)
            return JSON.parse(response.data);
        } catch (err) {
            console.log(err)
        }
    }
}