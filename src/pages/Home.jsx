import { Container, Box, Typography } from '@mui/material'
import LanguageSwitcher from '../components/LanguageSwitcher'
import WeatherCard from '../components/WeatherCard'
import SearchBar from '../components/SearchBar'

const Home = () => {


  return (
    <Container maxWidth="sm">
      {/* Idiomas - parte superior derecha */}
      <LanguageSwitcher />

      {/* Barra de búsqueda */}
      <SearchBar />

      {/* Resultado del clima */}
      <WeatherCard />
    </Container>
  )
}

export default Home