import { Card, H4 } from '@blueprintjs/core';

import { CapacityLevel } from '../../../common/model/capacity';

import './level.scss';

export function Level(props: { level: CapacityLevel; index: number }) {
  const { level, index } = props;
  const title = `${index - 1} | ${level.name}`;
  return (
    <Card>
      <header>
        <H4>{title}</H4>
      </header>
      {level.description}
    </Card>
  );
}
