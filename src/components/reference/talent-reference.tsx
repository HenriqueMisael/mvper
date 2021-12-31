import React from 'react';
import { t } from 'i18next';

import { selectors, useSelector } from '../../store';
import { TalentHeader } from '../talent/talent-header';
import { TalentPreRequirement } from '../talent/talent-pre-requirement';
import { TalentDescription } from '../talent/talent-description';

import ReferencePopover from './reference-popover';
import { ReferenceComponentProps } from './index';

const TalentReference = ({ name }: ReferenceComponentProps) => {
  const talent = useSelector((state) =>
    selectors.core.getTalents(state).find((talent) => talent.name === name),
  );

  return talent == null ? (
    <span>{t('common:notFound', { notFound: name })}</span>
  ) : (
    <ReferencePopover
      content={
        <section>
          <TalentHeader talent={talent} />
          <TalentPreRequirement talent={talent} />
          <TalentDescription talent={talent} />
        </section>
      }
      text={talent.name}
    />
  );
};

export default TalentReference;
