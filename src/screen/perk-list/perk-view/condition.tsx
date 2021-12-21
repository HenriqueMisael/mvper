import { Card, H4 } from '@blueprintjs/core';
import { Perk } from '../../../common/model/perk';
import './level.scss';
import { t } from 'i18next';

export function Condition(props: { perk: Perk }) {
  const { perk } = props;
  return (
    <Card className="perk-view-level">
      <header>
        <H4>{t('perk-list:condition')}</H4>
      </header>
      <p>{perk.condition}</p>
    </Card>
  );
}
