import { Box, Container, Stack } from '@mui/material'
import WeatherCard from '../components/WeatherCard'
import SearchBar from '../components/SearchBar'
import FiveDayForecastList from '../components/FiveDayForecastList'

const Home = () => {


  return (
    <Container maxWidth={false} sx={{ py: 2, px: { xs: 2, sm: 3, md: 4 } }}>
      {/* Barra de búsqueda (ocupa todo el ancho del contenedor) */}
      <SearchBar />

      {/* Zona inferior 50/50 */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        mt={2}
        alignItems={{ xs: 'stretch', md: 'stretch' }}
      >
        <Box sx={{ flex: 1, minWidth: 0, display: 'flex' }}>
          <FiveDayForecastList />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0, display: 'flex' }}>
          <WeatherCard />
        </Box>
      </Stack>

    </Container>
  )
}

export default Home