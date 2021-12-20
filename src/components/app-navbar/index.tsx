import React from 'react'
import { Alignment, Navbar } from '@blueprintjs/core'

import LanguageSelector from './language-selector'
import ThemeToggle from './theme-toggle'

import './index.scss'

const AppNavbar = () => {
  return (
    <Navbar fixedToTop>
      <Navbar.Group>
        <Navbar.Heading>MVPer</Navbar.Heading>
        <Navbar.Divider />
      </Navbar.Group>
      <Navbar.Group align={Alignment.LEFT} />
      <Navbar.Group align={Alignment.RIGHT}>
        <div className="system-preferences-parent">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </Navbar.Group>
    </Navbar>
  )
}

export default AppNavbar
