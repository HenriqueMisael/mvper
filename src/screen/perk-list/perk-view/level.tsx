import { Card, H4, Label } from '@blueprintjs/core';
import { t } from 'i18next';

import { PerkLevel } from '../../../common/model/perk';
import { ParseReferences } from '../../../components/reference';

import './level.scss';
import { PerkLevelActions } from './perk-level-actions';

export function Level(props: { level: PerkLevel; index: number }) {
  const { level, index } = props;
  const title = `${t('perk-list:level', { level: index + 1 })}: ${level.name}`;
  return (
    <Card>
      <header>
        <H4>{title}</H4>
      </header>
      {level.preRequirement && (
        <Label>
          <i>
            {t('common:preRequirement')}: {level.preRequirement}
          </i>
        </Label>
      )}
      {level.requirement && (
        <Label>
          <i>
            {t('common:requirement')}: <ParseReferences parseable={level.requirement} />
          </i>
        </Label>
      )}
      <PerkLevelActions level={level} />
    </Card>
  );
}
