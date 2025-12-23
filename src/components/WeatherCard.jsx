import { Card, CardContent, Typography, Box, Grid } from '@mui/material'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import AirIcon from '@mui/icons-material/Air'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const WeatherCard = () => {
  const { t } = useTranslation()

  const { data, isLoading, error } = useSelector(
    state => state.weather
  )

  if (isLoading) return <Typography>{t('loading')}</Typography>
  if (error) return <Typography color="error">{error}</Typography>
  if (!data || data.forecast.length === 0) return null

  const current = data.forecast[0]

  return (
    <Card
      sx={{
        width: '100%',
        mt: 0,
        borderRadius: 4,
        background: 'linear-gradient(180deg, #1f3b45, #162a32)',
        color: '#fff',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      }}
    >
      <CardContent sx={{ textAlign: 'center', py: 4 }}>
        {/* CIUDAD */}
        <Typography variant="h6" sx={{ letterSpacing: 1 }}>
          {data.city}, {data.country}
        </Typography>

        <Typography
          variant="body2"
          sx={{ opacity: 0.7, mb: 3 }}
        >
          {current.weather[0].description}
        </Typography>

        {/* TEMPERATURA */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            mb: 4,
          }}
        >
          <img
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`}
            alt={current.weather[0].description}
            width={100}
          />

          <Typography variant="h2" fontWeight={600}>
            {Math.round(current.main.temp)}°
          </Typography>
        </Box>

        {/* INFO SECUNDARIA */}
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, color: '#fff' }}>
              <ThermostatIcon fontSize="small" sx={{ color: '#fff' }} />
              <Typography variant="body2" sx={{ color: '#fff' }}>
                {t('feelsLike')}
              </Typography>
            </Box>
            <Typography variant="h6">
              {Math.round(current.main.feels_like)}°C
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, color: '#fff' }}>
              <WaterDropIcon fontSize="small" sx={{ color: '#fff' }} />
              <Typography variant="body2" sx={{ color: '#fff' }}>
                {t('humidity')}
              </Typography>
            </Box>
            <Typography variant="h6">
              {current.main.humidity}%
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, color: '#fff' }}>
              <AirIcon fontSize="small" sx={{ color: '#fff' }} />
              <Typography variant="body2" sx={{ color: '#fff' }}>
                {t('wind')}
              </Typography>
            </Box>
            <Typography variant="h6">
              {current.wind.speed} m/s
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, color: '#fff' }}>
              <CloudQueueIcon fontSize="small" sx={{ color: '#fff' }} />
              <Typography variant="body2" sx={{ color: '#fff' }}>
                {t('clouds')}
              </Typography>
            </Box>
            <Typography variant="h6">
              {current.clouds.all}%
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default WeatherCard