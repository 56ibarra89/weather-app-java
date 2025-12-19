import { Card, CardContent, Typography, Box, Grid } from '@mui/material'
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
        maxWidth: 420,
        mx: 'auto',
        mt: 4,
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
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              {t('feelsLike')}
            </Typography>
            <Typography variant="h6">
              {Math.round(current.main.feels_like)}°C
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              {t('humidity')}
            </Typography>
            <Typography variant="h6">
              {current.main.humidity}%
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              {t('wind')}
            </Typography>
            <Typography variant="h6">
              {current.wind.speed} m/s
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              {t('clouds')}
            </Typography>
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