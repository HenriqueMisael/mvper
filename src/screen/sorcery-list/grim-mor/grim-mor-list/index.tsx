import React from 'react';
import { H4 } from '@blueprintjs/core';
import { t } from 'i18next';

import { selectors, useSelector } from '../../../../store';

import GrimMorButton from './grim-mor-button';
import AddGrimMorInput from './add-grim-mor-input';
import './index.scss';

const GrimMorList = () => {
  const grimMores = useSelector(selectors.grimMor.getGrimMores);

  return (
    <section style={{ marginBottom: '1rem' }}>
      <H4>{t('sorcery-list:filter.savedGrimMores')}</H4>
      {grimMores.map((grimMor) => (
        <GrimMorButton key={grimMor.id} grimMor={grimMor} />
      ))}
      <AddGrimMorInput />
    </section>
  );
};

export default GrimMorList;
