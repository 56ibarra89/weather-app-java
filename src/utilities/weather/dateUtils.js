export const formatDayLabel = (date, locale) => {
  try {
    return new Intl.DateTimeFormat(locale, { weekday: 'short', day: '2-digit', month: 'short' }).format(date)
  } catch {
    return date.toDateString()
  }
}
