import { Talent } from '../../common/model/talent';
import { UL } from '@blueprintjs/core';
import classNames from 'classnames';
import React from 'react';

export const TalentRanks = (props: { talent: Talent }) => {
  const { talent } = props;
  return (
    <UL className="talent-ranks">
      {talent.ranks.map((talentRank) => {
        const key = `${talent.name}-${talentRank.rank}`;
        return (
          <li
            key={key}
            className={classNames('talent-rank', `rank-${talentRank.rank.toLowerCase()}`)}
          >
            <label className="bullet">{talentRank.rank}</label>
            {talentRank.description}
          </li>
        );
      })}
    </UL>
  );
};
