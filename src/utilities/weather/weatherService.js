import { weatherApi } from '../../api/weatherApi'

const mapForecastResponse = (response) => ({
  city: response.data.city.name,
  country: response.data.city.country,
  forecast: response.data.list,
})

// Unified forecast fetcher: supports lat/lon or city name
export const getForecast = async ({ lat, lon, city, lang = 'en' }) => {
  const params = { lang }
  if (typeof lat === 'number' && typeof lon === 'number') {
    params.lat = lat
    params.lon = lon
  } else if (city) {
    params.q = city
  }

  const response = await weatherApi.get('/forecast', { params })
  return mapForecastResponse(response)
}

// Backward-compatible helpers used by slice/hooks
export const getTodayWeatherByCity = async (lat, lon, lang = 'en') => {
  return getForecast({ lat, lon, lang })
}

export const getWeatherByCityName = async (city, lang = 'en') => {
  return getForecast({ city, lang })
}