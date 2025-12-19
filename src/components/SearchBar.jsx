import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CitySearch from './CitySearch'

const SearchBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" noWrap>
            Weather App
          </Typography>

          <CitySearch />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default SearchBar