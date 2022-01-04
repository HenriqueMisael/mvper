import React from 'react';

import { ReferenceComponent } from './index';
import SimpleReference from './simple-reference';

const OnusReference: ReferenceComponent = (props) => {
  return <SimpleReference context="vit" {...props} />;
};

export default OnusReference;
