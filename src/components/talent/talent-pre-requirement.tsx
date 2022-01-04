import { Talent } from '../../common/model/talent';
import { Label } from '@blueprintjs/core';
import { t } from 'i18next';
import React from 'react';
import { ParseReferences } from '../reference';

export const TalentPreRequirement = (props: { talent: Talent }) => {
  const { talent } = props;

  if (!talent.preRequirement) return null;

  const parseable = `${t('common:preRequirement')}: ${talent.preRequirement}`;
  return (
    <Label>
      <i>
        <ParseReferences parseable={parseable} />
      </i>
    </Label>
  );
};
