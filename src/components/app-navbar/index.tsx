import React from 'react';
import { NavLink } from 'react-router-dom';
import { Alignment, Button, Classes, Navbar } from '@blueprintjs/core';
import { t } from 'i18next';

import GlobalSearch from '../global-search';

import LanguageSelector from './language-selector';
import ThemeToggle from './theme-toggle';
import './index.scss';

const AppNavbar = () => {
  return (
    <Navbar fixedToTop className="app-navbar">
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>MVPer</Navbar.Heading>
        <Navbar.Divider />
        <NavLink to="/capacity" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button text={t('capacity-list:title')} className={Classes.MINIMAL} />
        </NavLink>
        <NavLink to="/perk" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button text={t('perk-list:title')} className={Classes.MINIMAL} />
        </NavLink>
        <NavLink to="/talent" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button text={t('talent-list:title')} className={Classes.MINIMAL} />
        </NavLink>
      </Navbar.Group>
      <Navbar.Group align={Alignment.CENTER} className="center-navbar-group">
        <GlobalSearch />
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <div className="system-preferences-parent">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </Navbar.Group>
    </Navbar>
  );
};

export default AppNavbar;
