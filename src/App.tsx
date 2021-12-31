import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './i18n/config';
import { selectors, useSelector } from './store';

import { LoadingOverlay } from './components/loading-overlay';
import AppNavbar from './components/app-navbar';
import { useLoadInitialData } from './hooks/use-load-initial-data';
import HomeScreen from './screen/home';
import PerkListScreen from './screen/perk-list';
import TalentListScreen from './screen/talent-list';
import './App.scss';
import CapacityListScreen from './screen/capacity-list';

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
        <LoadingOverlay />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/perk" element={<PerkListScreen />} />
          <Route path="/perk/:perkID" element={<PerkListScreen />} />
          <Route path="/capacity" element={<CapacityListScreen />} />
          <Route path="/capacity/:capacityID" element={<CapacityListScreen />} />
          <Route path="/talent" element={<TalentListScreen />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
