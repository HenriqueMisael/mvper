import React from 'react';
import { H4, Slider } from '@blueprintjs/core';
import { t } from 'i18next';

import { useSphereRequirementFilter } from '../hooks';

const SphereRequirementSlider = () => {
  const [value, setMax] = useSphereRequirementFilter();
  return (
    <section>
      <H4>{t('sorcery-list:filter.sphereRequirement')}</H4>
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

export default SphereRequirementSlider;
