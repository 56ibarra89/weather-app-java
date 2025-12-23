import axios from 'axios'

export const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
})

// Set default params to avoid repetition across service calls
weatherApi.defaults.params = {
  appid: import.meta.env.VITE_WEATHER_API_KEY,
  units: 'metric',
}