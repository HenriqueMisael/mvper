import React from 'react';
import { H4, Menu } from '@blueprintjs/core';

import { selectors, useSelector } from '../../store';

import './index.scss';
import { PerkView } from './perk-view';
import { useParams } from 'react-router-dom';

import AnchorMenuItem from '../../components/anchor-menu-item';

import PerksHome from './perks-home';

const PerkListScreen = () => {
  const { perkID } = useParams();
  const perks = useSelector(selectors.core.getPerks);

  return (
    <div className="screen-root perks-screen-root">
      <Menu>
        {perks.map((perk) => {
          const key = `perk-${perk.id}`;
          return (
            <AnchorMenuItem
              disabled={perk.id === perkID}
              active={perk.id === perkID}
              href={`/perk/${perk.id}`}
              key={key}
              text={<H4>{perk.name}</H4>}
            />
          );
        })}
      </Menu>
      {perkID ? <PerkView /> : <PerksHome />}
    </div>
  );
};

export default PerkListScreen;
