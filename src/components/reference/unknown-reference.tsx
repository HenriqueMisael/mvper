import React from 'react';
import { t } from 'i18next';

import { ReferenceComponentProps } from './index';

const UnknownReference = ({ name }: ReferenceComponentProps) => {
  return <span>{t('common:unknownReference', { name })}</span>;
};

export default UnknownReference;
