import React from 'react';
import { Alignment, Button, Classes, Navbar } from '@blueprintjs/core';

import LanguageSelector from './language-selector';
import ThemeToggle from './theme-toggle';

import './index.scss';
import { t } from 'i18next';
import { NavLink } from 'react-router-dom';

const AppNavbar = () => {
  return (
    <Navbar fixedToTop>
      <Navbar.Group>
        <Navbar.Heading>MVPer</Navbar.Heading>
        <Navbar.Divider />
      </Navbar.Group>
      <Navbar.Group align={Alignment.LEFT}>
        <NavLink to="/perk" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button text={t('perk-list:title')} className={Classes.MINIMAL} />
        </NavLink>
        <NavLink to="/talent" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button text={t('talent-list:title')} className={Classes.MINIMAL} />
        </NavLink>
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
