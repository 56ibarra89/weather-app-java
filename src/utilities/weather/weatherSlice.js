import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit'
import { getTodayWeatherByCity, getWeatherByCityName } from './weatherService'
import { extractApiErrorMessage } from './errors'

/**
 * 🔹 Clima por coordenadas (CitySelector)
 */
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async ({ lat, lon, lang }, thunkAPI) => {
    try {
      return await getTodayWeatherByCity(lat, lon, lang)
    } catch (error) {
      const message = extractApiErrorMessage(error, 'Error fetching weather data')
      return thunkAPI.rejectWithValue(message)
    }
  }
)

/**
 * 🔹 Clima por nombre de ciudad (SearchBar)
 */
export const fetchWeatherByCityName = createAsyncThunk(
  'weather/fetchWeatherByCityName',
  async ({ city, lang }, thunkAPI) => {
    try {
      return await getWeatherByCityName(city, lang)
    } catch (error) {
      const message = extractApiErrorMessage(error, 'City not found')
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const initialState = {
  data: null,
  isLoading: false,
  error: null,
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearWeather: state => {
      state.data = null
      state.error = null
    },
  },
  extraReducers: builder => {
    builder

      .addMatcher(
        isAnyOf(fetchWeather.pending, fetchWeatherByCityName.pending),
        state => {
          state.isLoading = true
          state.error = null
        }
      )
      .addMatcher(
        isAnyOf(fetchWeather.fulfilled, fetchWeatherByCityName.fulfilled),
        (state, action) => {
          state.isLoading = false
          state.data = action.payload
        }
      )
      .addMatcher(
        isAnyOf(fetchWeather.rejected, fetchWeatherByCityName.rejected),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload ?? action.error?.message ?? 'Unexpected error'
        }
      )
  },
})

export const { clearWeather } = weatherSlice.actions
export default weatherSlice.reducer