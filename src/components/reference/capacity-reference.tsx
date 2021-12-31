import React from 'react';
import { t } from 'i18next';

import { selectors, useSelector } from '../../store';
import { ComplexEntityHeader } from '../complex-entity/complex-entity-header';

import ReferencePopover from './reference-popover';
import { ReferenceComponentProps } from './index';

const CapacityReference = ({ name }: ReferenceComponentProps) => {
  const [id, value] = name.split('$');
  const capacity = useSelector((state) => selectors.core.getCapacityByCapacityID(state)[id]);

  if (capacity == null) {
    return <span>{t('common:notFound', { notFound: name })}</span>;
  }

  const text = value ? `+${value} ${capacity.name}` : capacity.name;
  const content = (
    <section>
      <ComplexEntityHeader entity={capacity} />
    </section>
  );
  return <ReferencePopover content={content} text={text} />;
};

export default CapacityReference;
