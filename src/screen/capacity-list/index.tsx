import React from 'react';
import { useParams } from 'react-router-dom';

import { selectors, useSelector } from '../../store';
import ComplexEntityList from '../../components/complex-entity-list';

import { CapacityView } from './capacity-view';

const CapacityListScreen = () => {
  const { capacityID } = useParams();
  const capacities = useSelector(selectors.core.getCapacities);

  return (
    <ComplexEntityList
      items={capacities}
      selected={capacityID}
      entityView={CapacityView}
      name="capacity"
    />
  );
};

export default CapacityListScreen;
