import { Card, H4, Label, UL } from '@blueprintjs/core';
import { t } from 'i18next';

import { PerkLevel } from '../../../common/model/perk';

import './level.scss';

export function Level(props: { level: PerkLevel; index: number }) {
  const { level, index } = props;
  const title = `${t('perk-list:level', { level: index + 1 })}: ${level.name}`;
  return (
    <Card className="perk-view-level">
      <header>
        <H4>{title}</H4>
      </header>
      {level.preRequirement && (
        <Label>
          <i>
            {t('perk-list:preRequirement')}: {level.preRequirement}
          </i>
        </Label>
      )}
      {level.requirement && (
        <Label>
          <i>
            {t('perk-list:requirement')}: {level.requirement}
          </i>
        </Label>
      )}
      <UL className="level-actions">
        {level.actions.map((action, i) => {
          const key = `${level.name}-${i}`;
          return (
            <li key={key} className="level-action">
              <label className="bullet">{action.cost === 0 ? '»' : action.cost}</label>
              {action.description}
            </li>
          );
        })}
      </UL>
    </Card>
  );
}
