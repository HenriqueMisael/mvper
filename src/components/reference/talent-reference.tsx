import React from 'react';
import { t } from 'i18next';

import { selectors, useSelector } from '../../store';
import { TalentHeader } from '../talent/talent-header';
import { TalentPreRequirement } from '../talent/talent-pre-requirement';
import { TalentDescription } from '../talent/talent-description';

import ReferencePopover from './reference-popover';
import { ReferenceComponent } from './index';

const TalentReference: ReferenceComponent = (props) => {
  const [name, rankIndex] = props.name.split('$');

  const talent = useSelector((state) =>
    selectors.core.getTalents(state).find((talent) => talent.name === name),
  );

  if (talent == null) {
    return <span>{t('common:notFound', { notFound: name })}</span>;
  }

  const talentRank = talent.ranks[Number(rankIndex)];
  return (
    <ReferencePopover
      content={
        <section>
          <TalentHeader talent={talent} />
          <TalentPreRequirement talent={talent} />
          <TalentDescription talent={talent} />
          {talentRank == null ? null : (
            <span>
              <strong>{talentRank.rank}: </strong>
              {talentRank.description}
            </span>
          )}
        </section>
      }
      text={talent.name}
    />
  );
};

export default TalentReference;
