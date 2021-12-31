import React from 'react';

import { EntityView } from '../../../components/complex-entity/complex-entity-list';
import ComplexEntityView from '../../../components/complex-entity/complex-entity-view';
import { Capacity } from '../../../common/model/capacity';

import { Level } from './level';

export const CapacityView: EntityView<Capacity> = ({ entity: capacity }) => {
  return <ComplexEntityView entity={capacity} levelComponent={Level} />;
};
