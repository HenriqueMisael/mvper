import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './i18n/config';
import AppNavbar from './components/app-navbar';
import { selectors, useSelector } from './store';
import HomeScreen from './screen/home';

import './App.scss';
import PerkListScreen from './screen/perk-list';
import { useLoadInitialData } from './hooks/use-load-initial-data';

function App() {
  const themeClassName = useSelector((state) => {
    const theme = selectors.session.getTheme(state);
    return theme === 'light' ? '' : 'bp3-dark';
  });

  useLoadInitialData();

  return (
    <div className={themeClassName}>
      <AppNavbar />
      <div className="main">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/perk" element={<PerkListScreen />} />
          <Route path="/perk/:perkID" element={<PerkListScreen />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
