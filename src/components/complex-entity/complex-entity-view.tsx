import React, { PropsWithChildren, ReactNode } from 'react';
import { Card } from '@blueprintjs/core';
import classNames from 'classnames';

import { ComplexEntity } from '../../common/model/complex-entity';
import { WeightedItem } from '../../common/util';
import FlexibleGrid from '../flexible-grid';

import { EntityViewProps } from './complex-entity-list';
import { ComplexEntityHeader } from './complex-entity-header';
import './complex-entity-view.scss';

interface ComplexEntityViewProps<K, L>
  extends PropsWithChildren<EntityViewProps<ComplexEntity<K, L>>> {
  levelComponent: React.FunctionComponent<{ index: number; level: L }>;
}

const ComplexEntityView = <K extends string, L extends object>(
  props: ComplexEntityViewProps<K, L>,
) => {
  const { entity, children } = props;
  const LevelComponent = props.levelComponent;

  const items: WeightedItem<ReactNode>[] = entity.levels.map((level, i) => {
    const titleSize = 1;
    const descriptionSize = 1;
    const cardSize = titleSize + descriptionSize;

    const key = `${entity.id}-${i}`;
    const node = <LevelComponent key={key} index={i} level={level} />;

    return {
      t: node,
      weight: cardSize,
    };
  });
  if (children) {
    items.push({ weight: 3, t: children });
  }

  return (
    <section className={classNames('complex-entity-view')}>
      <header className="complex-entity-view-header">
        <Card>
          <ComplexEntityHeader entity={entity} />
        </Card>
      </header>
      <FlexibleGrid items={items} size="pt" />
    </section>
  );
};

export default ComplexEntityView;
