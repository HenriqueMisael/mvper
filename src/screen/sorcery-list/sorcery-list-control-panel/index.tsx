import React from 'react';

import SphereRequirementSlider from '../sphere-requirement-slider';
import PowerSlider from '../power-slider';

import EntityFilter from './entity-filter';
import './control-panel.scss';

const SorceryListControlPanel = () => {
  return (
    <div className="control-panel-root">
      <EntityFilter />
      <SphereRequirementSlider />
      <PowerSlider />
    </div>
  );
};

export default SorceryListControlPanel;
