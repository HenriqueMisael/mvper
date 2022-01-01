import React from 'react';
import { t } from 'i18next';

const UnknownReference = (props: { group: string }) => {
  return <span>{t('common:unknownReference', { name: props.group })}</span>;
};

export default UnknownReference;
