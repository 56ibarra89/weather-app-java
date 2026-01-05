import { Card, CardContent, Typography, Box, Grid } from '@mui/material'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import AirIcon from '@mui/icons-material/Air'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import MetricItem from './MetricItem'

const WeatherCard = () => {
  const { t } = useTranslation()

  const { data, isLoading, error } = useSelector(
    state => state.weather
  )

  const hasForecast = Boolean(data?.forecast?.length)
  const current = hasForecast ? data.forecast[0] : null

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        mt: 0,
        borderRadius: 4,
        background: 'linear-gradient(180deg, #1f3b45, #162a32)',
        color: '#fff',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      }}
    >
      <CardContent
        sx={{
          textAlign: 'center',
          py: 4,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {isLoading ? (
          <Typography>{t('loading')}</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : !hasForecast ? (
          <Typography sx={{ opacity: 0.85 }}>{t('searchPrompt')}</Typography>
        ) : (
          <>
            {/* CIUDAD */}
            <Typography variant="h6" sx={{ letterSpacing: 1 }}>
              {data.city}, {data.country}
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.7, mb: 3 }}>
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
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={6}>
                <MetricItem
                  icon={<ThermostatIcon fontSize="small" sx={{ color: '#fff' }} />}
                  label={t('feelsLike')}
                  value={`${Math.round(current.main.feels_like)}°C`}
                />
              </Grid>
              <Grid item xs={6}>
                <MetricItem
                  icon={<WaterDropIcon fontSize="small" sx={{ color: '#fff' }} />}
                  label={t('humidity')}
                  value={`${current.main.humidity}%`}
                />
              </Grid>
              <Grid item xs={6}>
                <MetricItem
                  icon={<AirIcon fontSize="small" sx={{ color: '#fff' }} />}
                  label={t('wind')}
                  value={`${current.wind.speed} m/s`}
                />
              </Grid>
              <Grid item xs={6}>
                <MetricItem
                  icon={<CloudQueueIcon fontSize="small" sx={{ color: '#fff' }} />}
                  label={t('clouds')}
                  value={`${current.clouds.all}%`}
                />
              </Grid>
            </Grid>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default WeatherCard