import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './i18n/config'
import AppNavbar from './components/app-navbar'
import { selectors, useSelector } from './store'
import HomeScreen from './screen/home'

import './App.scss'

function App() {
  const themeClassName = useSelector((state) => {
    const theme = selectors.session.getTheme(state)
    return theme === 'light' ? '' : 'bp3-dark'
  })
  return (
    <div className={themeClassName}>
      <AppNavbar />
      <div className="main">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
