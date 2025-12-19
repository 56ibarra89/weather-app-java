import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getTodayWeatherByCity,
  getWeatherByCityName,
} from './weatherService'

/**
 * 🔹 Clima por coordenadas (CitySelector)
 */
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async ({ lat, lon, lang }, thunkAPI) => {
    try {
      return await getTodayWeatherByCity(lat, lon, lang)
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Error fetching weather data'
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
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'City not found'
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

      // 🔹 Coordenadas
      .addCase(fetchWeather.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // 🔹 Nombre de ciudad
      .addCase(fetchWeatherByCityName.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchWeatherByCityName.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchWeatherByCityName.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearWeather } = weatherSlice.actions
export default weatherSlice.reducer