import React from 'react';
import { H4, Menu } from '@blueprintjs/core';

import AnchorMenuItem from '../anchor-menu-item';

import './complex-entity-list.scss';
import ComplexEntityListHome from './home';
import { ComplexEntity } from '../../common/model/complex-entity';

export type EntityViewProps<T> = { entity: T };
export type EntityView<T, P = {}> = React.FunctionComponent<EntityViewProps<T> & P>;
interface ComplexEntityScreenProps<T, K> {
  items: T[];
  selected: K;
  name: string;
  entityView: EntityView<T>;
}
const ComplexEntityList = <T extends ComplexEntity<K, L>, L extends object, K = string>(
  props: ComplexEntityScreenProps<T, K>,
) => {
  const { entityView, items, name, selected } = props;
  const selectedEntity = items.find((entity) => entity.id === selected);
  return (
    <div className="screen-root complex-entity-screen-root">
      <Menu>
        {items.map((entity) => {
          const key = `${name}-${entity.id}`;
          return (
            <AnchorMenuItem
              disabled={entity.id === selected}
              active={entity.id === selected}
              href={`/${name}/${entity.id}`}
              key={key}
              text={<H4>{entity.name}</H4>}
            />
          );
        })}
      </Menu>
      {selectedEntity ? (
        React.createElement(entityView, { entity: selectedEntity })
      ) : (
        <ComplexEntityListHome name={name} />
      )}
    </div>
  );
};

export default ComplexEntityList;
