import { Box, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import CheckIcon from '@mui/icons-material/Check'
import { useState } from 'react'
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

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleOpen = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const handleSelect = lang => {
    handleChangeLanguage(lang)
    handleClose()
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title="Language / Idioma">
        <IconButton color="inherit" onClick={handleOpen} aria-label="select language">
          <LanguageIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => handleSelect('en')} selected={currentLanguage === 'en'}>
          {currentLanguage === 'en' && (
            <ListItemIcon>
              <CheckIcon fontSize="small" />
            </ListItemIcon>
          )}
          <ListItemText primary="English (EN)" />
        </MenuItem>

        <MenuItem onClick={() => handleSelect('es')} selected={currentLanguage === 'es'}>
          {currentLanguage === 'es' && (
            <ListItemIcon>
              <CheckIcon fontSize="small" />
            </ListItemIcon>
          )}
          <ListItemText primary="Español (ES)" />
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default LanguageSwitcher