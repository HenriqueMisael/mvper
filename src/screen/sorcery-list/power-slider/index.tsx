import React from 'react';
import { H4, Slider } from '@blueprintjs/core';
import { t } from 'i18next';

import { usePowerFilter } from '../hooks';

const PowerSlider = () => {
  const [value, setMax] = usePowerFilter();
  return (
    <section>
      <H4>{t('sorcery-list:filter.power')}</H4>
      <Slider
        value={value}
        max={5}
        onChange={(newMax) => {
          setMax(newMax);
        }}
      />
    </section>
  );
};

export default PowerSlider;
