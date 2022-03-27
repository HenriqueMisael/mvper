import React from 'react';

import PowerSlider from '../power-slider';
import GrimMorList from '../grim-mor/grim-mor-list';

import EntityFilter from './entity-filter';
import './control-panel.scss';

const SorceryListControlPanel = () => {
  return (
    <div className="control-panel-root">
      <GrimMorList />
      <EntityFilter />
      <PowerSlider />
    </div>
  );
};

export default SorceryListControlPanel;
