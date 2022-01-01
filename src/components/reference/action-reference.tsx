import React from 'react';

import { ReferenceComponent } from './index';
import SimpleReference from './simple-reference';

const ActionReference: ReferenceComponent = (props) => {
  return <SimpleReference context="action" {...props} />;
};

export default ActionReference;
