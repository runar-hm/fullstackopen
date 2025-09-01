import axios from 'axios'

const key = import.meta.env.VITE_WEATHER_API_KEY

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const fetchCurrentWeather = (capital, countryCode) => {

    const url = `${baseUrl}?q=${capital},${countryCode}&units=metric&appid=${key}`

    console.log(`Querying weather API for capital ${capital} and country code ${countryCode}`)
    const request = axios.get(url)
    return request.then(response => response.data)
}

export default { fetchCurrentWeather }