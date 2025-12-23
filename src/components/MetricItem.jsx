import { Box, Typography } from '@mui/material'

const MetricItem = ({ icon, label, value, unit, compact = false }) => {
  if (compact) {
    return (
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
        {icon}
        <Typography variant="caption" component="span">
          {label}: {value}{unit ? unit : ''}
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
        {icon}
        <Typography variant="body2">
          {label}
        </Typography>
      </Box>
      <Typography variant="h6">
        {value}{unit ? unit : ''}
      </Typography>
    </Box>
  )
}

export default MetricItem
