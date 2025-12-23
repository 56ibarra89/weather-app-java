import { Card, CardContent, Typography, List, ListItemButton, ListItemText, Box } from '@mui/material'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import AirIcon from '@mui/icons-material/Air'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const groupByDay = (entries) => {
    const days = {}
    entries.forEach((item) => {
        const date = new Date(item.dt_txt)
        const key = date.toISOString().slice(0, 10)
        if (!days[key]) {
            days[key] = {
                date,
                items: [],
                min: Infinity,
                max: -Infinity,
                sumFeels: 0,
                sumHumidity: 0,
                sumWind: 0,
                sumClouds: 0,
                count: 0,
            }
        }
        days[key].items.push(item)
        days[key].min = Math.min(days[key].min, item.main.temp_min)
        days[key].max = Math.max(days[key].max, item.main.temp_max)
        days[key].sumFeels += item.main.feels_like
        days[key].sumHumidity += item.main.humidity
        days[key].sumWind += item.wind.speed
        days[key].sumClouds += item.clouds.all
        days[key].count += 1
    })

    return Object.values(days)
        .sort((a, b) => a.date - b.date)
        .map((d) => {
            const midIndex = Math.floor(d.items.length / 2)
            const mid = d.items[midIndex]
            const icon = mid?.weather?.[0]?.icon
            const description = mid?.weather?.[0]?.description
            return {
                date: d.date,
                min: d.min,
                max: d.max,
                feels: d.sumFeels / d.count,
                humidity: d.sumHumidity / d.count,
                wind: d.sumWind / d.count,
                clouds: d.sumClouds / d.count,
                icon,
                description,
            }
        })
}

const formatDayLabel = (date, locale) => {
    try {
        return new Intl.DateTimeFormat(locale, { weekday: 'short', day: '2-digit', month: 'short' }).format(date)
    } catch {
        return date.toDateString()
    }
}

// Hour labels no longer used in daily-only view

const FiveDayForecastList = () => {
    const { data, isLoading, error } = useSelector((state) => state.weather)
    const currentLanguage = useSelector((state) => state.language.currentLanguage)
    const { t } = useTranslation()

    if (isLoading || error || !data || !data.forecast || data.forecast.length === 0) return null

    const grouped = groupByDay(data.forecast)
    const nextFive = grouped.slice(0, 5)

    return (
        <Card sx={{ width: '100%', mt: 0, borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    {t('fiveDayForecast')}
                </Typography>

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
                                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                                            <ThermostatIcon fontSize="inherit" />
                                            <Typography variant="caption" component="span">
                                                {t('feelsLike')}: {Math.round(day.feels)}°C
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                                            <WaterDropIcon fontSize="inherit" />
                                            <Typography variant="caption" component="span">
                                                {t('humidity')}: {Math.round(day.humidity)}%
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                                            <AirIcon fontSize="inherit" />
                                            <Typography variant="caption" component="span">
                                                {t('wind')}: {Math.round(day.wind * 10) / 10} m/s
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                                            <CloudQueueIcon fontSize="inherit" />
                                            <Typography variant="caption" component="span">
                                                {t('clouds')}: {Math.round(day.clouds)}%
                                            </Typography>
                                        </Box>
                                    </Box>
                                </ListItemButton>
                            </Box>
                        )
                    })}
                </List>
            </CardContent>
        </Card>
    )
}

export default FiveDayForecastList