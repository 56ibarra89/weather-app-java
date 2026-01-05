import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CitySearch from './CitySearch'
import LanguageSwitcher from '../components/LanguageSwitcher'

const SearchBar = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static" sx={{ borderRadius: 2, mb: 2 }}>
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" noWrap>
            Weather App
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <CitySearch />
          </Box>

          <LanguageSwitcher />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default SearchBar