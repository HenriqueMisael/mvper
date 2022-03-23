import React from 'react';
import { Checkbox, H4, UL } from '@blueprintjs/core';
import { t } from 'i18next';

import { entities } from '../../../../common/model/sorcery';
import { useSelectedEntities } from '../../hooks';

const EntityFilter = () => {
  const [selectedEntities, setSelectedEntities] = useSelectedEntities();

  return (
    <section>
      <H4>{t('sorcery-list:filter.entity')}</H4>
      <UL style={{ listStyle: 'none' }}>
        {entities.map((entity) => {
          const key = `entity-filter-${entity}`;
          return (
            <li key={key}>
              <Checkbox
                label={entity}
                checked={selectedEntities.includes(entity)}
                onChange={({ target }) => {
                  if ((target as HTMLInputElement).checked) {
                    setSelectedEntities([...selectedEntities, entity]);
                  } else {
                    setSelectedEntities(selectedEntities.filter((x: string) => x !== entity));
                  }
                }}
              />
            </li>
          );
        })}
      </UL>
    </section>
  );
};

export default EntityFilter;
