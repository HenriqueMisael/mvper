import React from 'react';
import { H4, Menu } from '@blueprintjs/core';

import AnchorMenuItem from '../anchor-menu-item';

import './index.scss';
import ComplexEntityListHome from './home';

export type EntityViewProps<T> = { entity: T };
export type EntityView<T, P = {}> = React.FunctionComponent<EntityViewProps<T> & P>;
interface ComplexEntityScreenProps<T, K> {
  items: T[];
  selected: K;
  name: string;
  textRenderer: (entity: T) => string;
  entityView: EntityView<T>;
}
const ComplexEntityList = <T extends { id?: K }, K = string>(
  props: ComplexEntityScreenProps<T, K>,
) => {
  const { entityView, items, name, selected, textRenderer } = props;
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
              text={<H4>{textRenderer(entity)}</H4>}
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
