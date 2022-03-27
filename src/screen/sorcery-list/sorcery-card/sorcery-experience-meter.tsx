import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { Sorcery } from '../../../common/model/sorcery';
import { range } from '../../../common/util';
import { useSelectedGrimMorID } from '../hooks';

import IncrementSorceryExperienceButton from './increment-sorcery-experience-button';
import DecrementSorceryExperienceButton from './decrement-sorcery-experience-button';

interface Props {
  sorcery: Sorcery;
}

const SorceryExperienceMeter = ({ sorcery }: Props) => {
  const [selectedGrimMorID] = useSelectedGrimMorID();
  const distinctOrbs: ReactNode[] = range(sorcery.experience.distinct).map((i) => {
    const classes = ['xpm', 'dot', 'distinct'];
    const key = `experience-orb:${sorcery.id}#${i}`;
    return <span key={key} className={classNames(classes)} />;
  });
  const commonOrbs: ReactNode[] = range(sorcery.experience.common).map((i) => {
    const classes = ['xpm', 'dot', 'common'];
    const key = `experience-orb:${sorcery.id}#${i + distinctOrbs.length}`;
    return <span key={key} className={classNames(classes)} />;
  });
  const unfilledOrbs: ReactNode[] = range(4 - distinctOrbs.length - commonOrbs.length).map(
    (i) => {
      const classes = ['xpm', 'dot'];
      const key = `experience-orb:${sorcery.id}#${i + distinctOrbs.length + commonOrbs.length}`;
      return <span key={key} className={classNames(classes)} />;
    },
  );

  return (
    <div className="sorcery-meter-root">
      {distinctOrbs}
      {commonOrbs}
      {unfilledOrbs}
      <span className={`xpm dot entity entity-${sorcery.entity} active`} />
      {selectedGrimMorID !== '' && !sorcery.experience.blocked && (
        <IncrementSorceryExperienceButton
          grimMorID={selectedGrimMorID}
          sorceryID={sorcery.id}
        />
      )}
      {selectedGrimMorID !== '' && sorcery.usageCount > 0 && (
        <DecrementSorceryExperienceButton
          grimMorID={selectedGrimMorID}
          sorceryID={sorcery.id}
        />
      )}
    </div>
  );
};

export default SorceryExperienceMeter;
