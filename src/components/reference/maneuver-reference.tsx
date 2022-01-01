import React from 'react';

import { ReferenceComponent } from './index';
import SimpleReference from './simple-reference';

const ManeuverReference: ReferenceComponent = (props) => {
  return <SimpleReference context="maneuver" {...props} />;
};

export default ManeuverReference;
