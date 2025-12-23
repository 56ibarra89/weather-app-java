import { styled, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import SearchIcon from '@mui/icons-material/Search'
import { useCitySearch } from '../hooks/useCitySearch'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 5, 1, 1),
  },
}))

const CitySearch = () => {
  const {
    query,
    setQuery,
    open,
    setOpen,
    filteredCities,
    searchCity,
    selectCity,
  } = useCitySearch()

  return (
    <Box sx={{ position: 'relative' }}>
      <Search>
        <StyledInputBase
          placeholder="Search city…"
          value={query}
          onChange={e => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              searchCity()
            }
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
        />

        <IconButton
          onClick={searchCity}
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            height: '100%',
            color: 'inherit',
          }}
        >
          <SearchIcon />
        </IconButton>
      </Search>

      {open && filteredCities.length > 0 && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        >
          <List dense>
            {filteredCities.map(city => (
              <ListItemButton
                key={city.name}
                onClick={() => selectCity(city)}
              >
                <ListItemText primary={city.name} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  )
}

export default CitySearch