import { weatherApi } from '../../api/weatherApi'


export const getTodayWeatherByCity = async (lat, lon, lang = 'en') => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  const response = await weatherApi.get('/forecast', {
    params: {
      lat,
      lon,
      appid: apiKey,
      units: 'metric',
      lang,
    },
  })

  return {
    city: response.data.city.name,
    country: response.data.city.country,
    forecast: response.data.list.slice(0, 4),
  }
}

//  función para obtener el clima por nombre de ciudad
export const getWeatherByCityName = async (city, lang = 'en') => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  const response = await weatherApi.get('/forecast', {
    params: {
      q: city,
      appid: apiKey,
      units: 'metric',
      lang,
    },
  })

  return {
    city: response.data.city.name,
    country: response.data.city.country,
    forecast: response.data.list.slice(0, 4),
  }
}