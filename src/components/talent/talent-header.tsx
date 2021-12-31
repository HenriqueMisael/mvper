import React from 'react';
import { H4 } from '@blueprintjs/core';

import { Talent } from '../../common/model/talent';

export const TalentHeader = (props: { talent: Talent }) => {
  const { talent } = props;
  return (
    <header>
      <H4>{talent.name}</H4>
    </header>
  );
};
