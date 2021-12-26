import React from 'react';
import { H4, Menu } from '@blueprintjs/core';
import { useParams } from 'react-router-dom';

import { selectors, useSelector } from '../../store';
import AnchorMenuItem from '../../components/anchor-menu-item';

import { PerkView } from './perk-view';
import PerksHome from './perks-home';
import './index.scss';

const PerkListScreen = () => {
  const { perkID } = useParams();
  const perks = useSelector(selectors.core.getPerks);
  const isFetching = useSelector(selectors.core.getIsFetching);

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
      {!isFetching && perkID ? <PerkView /> : <PerksHome />}
    </div>
  );
};

export default PerkListScreen;
