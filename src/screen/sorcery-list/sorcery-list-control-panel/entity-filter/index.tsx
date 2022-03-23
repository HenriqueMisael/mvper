import React from 'react';
import { Button, Checkbox, Classes, H4, Icon, UL } from '@blueprintjs/core';
import { t } from 'i18next';
import classNames from 'classnames';

import { entities } from '../../../../common/model/sorcery';
import { useSelectedEntities } from '../../hooks';

import './index.scss';

const EntityFilter = () => {
  const [selectedEntities, setSelectedEntities] = useSelectedEntities();

  return (
    <section>
      <H4>{t('sorcery-list:filter.entity')}</H4>
      <UL className="entity-filter-list">
        {entities.map((entity) => {
          const key = `entity-filter-${entity}`;
          return (
            <li
              key={key}
              style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
            >
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
              <Button
                className={classNames(Classes.MINIMAL)}
                icon={<Icon icon="locate" size={12} />}
                onClick={() => {
                  setSelectedEntities([entity]);
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
