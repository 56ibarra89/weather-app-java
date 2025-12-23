import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchWeather,
  fetchWeatherByCityName,
} from '../utilities/weather/weatherSlice'
import { CITIES } from '../constants/cities'

export const useCitySearch = () => {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()
  const currentLanguage = useSelector(
    state => state.language.currentLanguage
  )

  const filteredCities = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return CITIES

    return CITIES.filter(city =>
      city.name.toLowerCase().startsWith(normalized)
    )
  }, [query])

  const searchCity = () => {
    const trimmed = query.trim()
    if (!trimmed) return

    const exactCity = CITIES.find(
      c => c.name.toLowerCase() === trimmed.toLowerCase()
    )

    if (exactCity) {
      dispatch(
        fetchWeather({
          lat: exactCity.lat,
          lon: exactCity.lon,
          lang: currentLanguage,
        })
      )
    } else {
      dispatch(
        fetchWeatherByCityName({
          city: trimmed,
          lang: currentLanguage,
        })
      )
    }

    setQuery('')
    setOpen(false)
  }

  const selectCity = city => {
    dispatch(
      fetchWeather({
        lat: city.lat,
        lon: city.lon,
        lang: currentLanguage,
      })
    )
    setQuery('')
    setOpen(false)
  }

  return {
    query,
    setQuery,
    open,
    setOpen,
    filteredCities,
    searchCity,
    selectCity,
  }
}