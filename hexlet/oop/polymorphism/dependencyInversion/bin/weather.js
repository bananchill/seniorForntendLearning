import axios from 'axios';
import WeatherService from '../WeatherService.js';
import { argv } from "node:process"


export default async function getWeatherService() {
    const city = argv[2];

    const weatherService = new WeatherService();
    const weather = await weatherService.getWeather(city)

    console.log(`Temperature in ${city}: ${weather?.temperature}C`)
}
getWeatherService()