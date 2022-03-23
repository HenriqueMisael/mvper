import React from 'react';

import { Entity } from '../../../common/model/sorcery';
import { range } from '../../../common/util';
import classNames from 'classnames';

interface Props {
  entity: Entity;
  experience: number;
}

const SorceryExperienceMeter = ({ entity, experience }: Props) => {
  return (
    <div className="sorcery-meter-root">
      {range(4).map((i) => {
        const classes = ['xpm', 'dot', `entity-${entity}`];
        if (experience > i) classes.push('active');
        return <span className={classNames(classes)} />;
      })}
      <span className={`xpm dot entity entity-${entity} active`} />
    </div>
  );
};

export default SorceryExperienceMeter;
