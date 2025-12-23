import { Container, Grid } from '@mui/material'
import WeatherCard from '../components/WeatherCard'
import SearchBar from '../components/SearchBar'
import FiveDayForecastList from '../components/FiveDayForecastList'

const Home = () => {


  return (
    <Container maxWidth="lg">
      {/* Barra de búsqueda (ocupa todo el ancho del contenedor) */}
      <SearchBar />

      {/* Zona inferior 50/50 */}
      <Grid container spacing={2} sx={{ mt: 2, flexWrap: 'nowrap' }} alignItems="flex-start">
        <Grid item xs={6}>
          <FiveDayForecastList />
        </Grid>
        <Grid item xs={6}>
          <WeatherCard />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home