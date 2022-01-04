import React from 'react';
import { Card } from '@blueprintjs/core';
import { t } from 'i18next';

const ComplexEntityListHome = (props: { name: string }) => {
  return (
    <div className="complex-entity-list-introduction">
      <Card>
        {t<string[]>(`${props.name}-list:introduction`).map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </Card>
    </div>
  );
};

export default ComplexEntityListHome;
