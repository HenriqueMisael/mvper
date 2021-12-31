import { ComplexEntity } from '../../common/model/complex-entity';
import { H3 } from '@blueprintjs/core';
import React from 'react';

export function ComplexEntityHeader<K, L>(props: { entity: ComplexEntity<K, L> }) {
  return (
    <>
      <H3>{props.entity.name}</H3>
      {props.entity.detail.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </>
  );
}
