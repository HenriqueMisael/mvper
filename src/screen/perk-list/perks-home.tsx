import React from 'react';
import { Card } from '@blueprintjs/core';
import { t } from 'i18next';

import './perks-home.scss';

const PerksHome = () => {
  return (
    <div className="perks-home">
      <Card>
        {t<string[]>('perk-list:details').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </Card>
    </div>
  );
};

export default PerksHome;
