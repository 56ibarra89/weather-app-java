export const groupByDay = (entries) => {
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
