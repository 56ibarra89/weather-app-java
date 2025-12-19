import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../utilities/weather/weatherSlice'
import languageReducer from '../utilities/languages/languageSlice'

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    language: languageReducer,
  },
})
