import React from 'react'
import { Switch } from '@blueprintjs/core'
import { t } from 'i18next'

import { actions, selectors, useDispatch, useSelector } from '../../store'

const ThemeToggle = () => {
  const theme = useSelector(selectors.session.getTheme)
  const dispatch = useDispatch()
  return (
    <Switch
      checked={theme === 'light'}
      label={t(`common:theme.${theme}`)}
      onChange={() => dispatch(actions.session.setTheme(theme === 'light' ? 'dark' : 'light'))}
    />
  )
}

export default ThemeToggle
