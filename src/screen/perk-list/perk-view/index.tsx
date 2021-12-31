import React from 'react';

import { EntityView } from '../../../components/complex-entity-list';
import { Perk } from '../../../common/model/perk';
import ComplexEntityView from '../../../components/complex-entity-list/complex-entity-view';

import { Level } from './level';
import { Condition } from './condition';

export const PerkView: EntityView<Perk> = ({ entity: perk }) => {
  return (
    <ComplexEntityView entity={perk} levelComponent={Level}>
      <Condition perk={perk} />
    </ComplexEntityView>
  );
};
