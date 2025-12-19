import { Box, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setLanguage } from '../utilities/languages/languageSlice'

const LanguageSwitcher = () => {
  const dispatch = useDispatch()
  const { i18n } = useTranslation()

  const currentLanguage = useSelector(
    state => state.language.currentLanguage
  )

  const handleChangeLanguage = lang => {
    i18n.changeLanguage(lang)
    dispatch(setLanguage(lang))
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 1,
        mb: 2,
      }}
    >
      <Button
        variant={currentLanguage === 'en' ? 'contained' : 'outlined'}
        size="small"
        onClick={() => handleChangeLanguage('en')}
      >
        EN
      </Button>

      <Button
        variant={currentLanguage === 'es' ? 'contained' : 'outlined'}
        size="small"
        onClick={() => handleChangeLanguage('es')}
      >
        ES
      </Button>
    </Box>
  )
}

export default LanguageSwitcher