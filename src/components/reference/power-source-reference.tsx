import React from 'react';

import SimpleReference from './simple-reference';
import { ReferenceComponent } from './index';

const PowerSourceReference: ReferenceComponent = (props) => {
  return <SimpleReference context="power" {...props} />;
};

export default PowerSourceReference;
