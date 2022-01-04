import { PerkLevel } from '../../../common/model/perk';
import { UL } from '@blueprintjs/core';
import { ParseReferences } from '../../../components/reference';

export function PerkLevelActions(props: { level: PerkLevel }) {
  const { level } = props;
  return (
    <UL className="level-actions">
      {level.actions.map((action, i) => {
        const key = `${level.name}-${i}`;
        return (
          <li key={key} className="level-action">
            <label className="bullet">{action.cost === 0 ? '»' : action.cost}</label>
            <ParseReferences parseable={action.description} />
          </li>
        );
      })}
    </UL>
  );
}
