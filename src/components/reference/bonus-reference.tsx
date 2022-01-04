import React from 'react';

import { ReferenceComponent } from './index';
import SimpleReference from './simple-reference';

const BonusReference: ReferenceComponent = (props) => {
  return <SimpleReference context="bonus" {...props} />;
};

export default BonusReference;
