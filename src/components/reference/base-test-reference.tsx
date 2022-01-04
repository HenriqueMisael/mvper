import React from 'react';

import { ReferenceComponent } from './index';
import SimpleReference from './simple-reference';

const BaseTestReference: ReferenceComponent = (props) => {
  return <SimpleReference context="base" {...props} />;
};

export default BaseTestReference;
