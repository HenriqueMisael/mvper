import React from 'react';

import { ReferenceComponent } from './index';
import SimpleReference from './simple-reference';

const AuxiliaryReference: ReferenceComponent = (props) => {
  return <SimpleReference context="aux" {...props} />;
};

export default AuxiliaryReference;
