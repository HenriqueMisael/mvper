import React from 'react';
import { Card } from '@blueprintjs/core';

import { TalentHeader } from '../../components/talent/talent-header';
import { TalentPreRequirement } from '../../components/talent/talent-pre-requirement';
import { TalentDescription } from '../../components/talent/talent-description';
import { TalentRanks } from '../../components/talent/talent-ranks';
import { Talent } from '../../common/model/talent';

interface TalentCardProps {
  talent: Talent;
}

export function TalentCard({ talent }: TalentCardProps) {
  return (
    <Card className="talent-card">
      <section>
        <TalentHeader talent={talent} />
        <TalentPreRequirement talent={talent} />
        <TalentDescription talent={talent} />
        <TalentRanks talent={talent} />
      </section>
    </Card>
  );
}
