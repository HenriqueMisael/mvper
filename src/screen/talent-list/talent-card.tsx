import { Card, H4, Label, UL } from '@blueprintjs/core';
import { t } from 'i18next';
import React from 'react';
import { Talent } from '../../common/model/talent';

interface TalentCardProps {
  talent: Talent;
}

export function TalentCard({
  talent: { description, name, preRequirement, ranks },
}: TalentCardProps) {
  return (
    <Card className="talent-card">
      <header>
        <H4>{name}</H4>
      </header>
      {preRequirement && (
        <Label>
          <i>
            {t('common:preRequirement')}: {preRequirement}
          </i>
        </Label>
      )}
      <p>{description}</p>
      <UL className="talent-ranks">
        {ranks.map((talentRank) => {
          const key = `${name}-${talentRank.rank}`;
          return (
            <li key={key} className="talent-rank">
              <label className="bullet">{talentRank.rank}</label>
              {talentRank.description}
            </li>
          );
        })}
      </UL>
    </Card>
  );
}
