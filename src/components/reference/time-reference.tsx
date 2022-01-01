import React from 'react';

import { ReferenceComponent } from './index';
import SimpleReference from './simple-reference';

const TimeReference: ReferenceComponent = (props) => {
  return <SimpleReference context="time" {...props} />;
};

export default TimeReference;
