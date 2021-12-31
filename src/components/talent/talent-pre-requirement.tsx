import { Talent } from '../../common/model/talent';
import { Label } from '@blueprintjs/core';
import { t } from 'i18next';
import React from 'react';

export const TalentPreRequirement = (props: { talent: Talent }) => {
  const { talent } = props;
  return talent.preRequirement == null ? null : (
    <Label>
      <i>
        {t('common:preRequirement')}: {talent.preRequirement}
      </i>
    </Label>
  );
};
