import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import { Card, H3 } from '@blueprintjs/core';

import { EntityViewProps } from './index';
import './complex-entity-view.scss';

interface ComplexEntity<K, L> {
  id: K;
  name: string;
  detail: string[];
  levels: L[];
}
interface ComplexEntityViewProps<K, L>
  extends PropsWithChildren<EntityViewProps<ComplexEntity<K, L>>> {
  levelComponent: React.FunctionComponent<{ index: number; level: L }>;
}

const ComplexEntityView = <K extends string, L extends object>(
  props: ComplexEntityViewProps<K, L>,
) => {
  const { entity, children } = props;
  const LevelComponent = props.levelComponent;
  return (
    <section className={classNames('complex-entity-view')}>
      <header className="complex-entity-view-header">
        <Card>
          <H3>{entity.name}</H3>
          {entity.detail.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </Card>
      </header>
      <div className="complex-entity-view-levels">
        {entity.levels.map((level, i) => {
          const key = `${entity.id}-${i}`;
          return <LevelComponent key={key} index={i} level={level} />;
        })}
        {children}
      </div>
    </section>
  );
};

export default ComplexEntityView;
