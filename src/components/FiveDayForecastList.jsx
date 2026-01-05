import { Card, CardContent, Typography, List, ListItemButton, ListItemText, Box } from '@mui/material'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import AirIcon from '@mui/icons-material/Air'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import MetricItem from './MetricItem'
import { groupByDay } from '../utilities/weather/forecastUtils'
import { formatDayLabel } from '../utilities/weather/dateUtils'

// Hour labels no longer used in daily-only view

const FiveDayForecastList = () => {
    const { data, isLoading, error } = useSelector((state) => state.weather)
    const currentLanguage = useSelector((state) => state.language.currentLanguage)
    const { t } = useTranslation()

    const forecast = data?.forecast
    const grouped = useMemo(() => (forecast?.length ? groupByDay(forecast) : []), [forecast])
    const nextFive = useMemo(() => grouped.slice(0, 5), [grouped])

    return (
        <Card sx={{ width: '100%', height: '100%', mt: 0, borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    {t('fiveDayForecast')}
                </Typography>

                {isLoading ? (
                    <Typography>{t('loading')}</Typography>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : !forecast || forecast.length === 0 ? (
                    <Typography sx={{ opacity: 0.75 }}>{t('searchPrompt')}</Typography>
                ) : (
                    <List disablePadding>
                        {nextFive.map((day) => {
                            const key = day.date.toISOString().slice(0, 10)

                            return (
                                <Box key={key}>
                                    <ListItemButton sx={{ gap: 2 }}>
                                        {day.icon && (
                                            <img
                                                src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                                                alt={day.description || ''}
                                                width={32}
                                                height={32}
                                            />
                                        )}
                                        <ListItemText
                                            primary={formatDayLabel(day.date, currentLanguage)}
                                            secondary={`${t('min')} ${Math.round(day.min)}° · ${t('max')} ${Math.round(day.max)}°`}
                                        />
                                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', ml: 2 }}>
                                            <MetricItem compact icon={<ThermostatIcon fontSize="inherit" />} label={t('feelsLike')} value={`${Math.round(day.feels)}°C`} />
                                            <MetricItem compact icon={<WaterDropIcon fontSize="inherit" />} label={t('humidity')} value={`${Math.round(day.humidity)}%`} />
                                            <MetricItem compact icon={<AirIcon fontSize="inherit" />} label={t('wind')} value={`${Math.round(day.wind * 10) / 10} m/s`} />
                                            <MetricItem compact icon={<CloudQueueIcon fontSize="inherit" />} label={t('clouds')} value={`${Math.round(day.clouds)}%`} />
                                        </Box>
                                    </ListItemButton>
                                </Box>
                            )
                        })}
                    </List>
                )}
            </CardContent>
        </Card>
    )
}

export default FiveDayForecastList