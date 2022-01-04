import React from 'react';

import { Talent } from '../../common/model/talent';

export const TalentDescription = (props: { talent: Talent }) => (
  <p>{props.talent.description}</p>
);
