import { ReactElement } from 'react';

import TalentReference from './talent-reference';
import UnknownReference from './unknown-reference';
import CapacityReference from './capacity-reference';
import ActionReference from './action-reference';
import OnusReference from './onus-reference';
import ManeuverReference from './maneuver-reference';
import AuxiliaryReference from './auxiliary-reference';
import BonusReference from './bonus-reference';
import TimeReference from './time-reference';
import DiceReference from './dice-reference';
import BaseTestReference from './base-test-reference';
import VitalityReference from './vit-reference';
import Index from './perk-reference';
import PowerSourceReference from './power-source-reference';

export interface ReferenceComponentProps {
  name: string;
}
export type ReferenceComponent = (props: ReferenceComponentProps) => ReactElement;
const referenceTypes: { [referenceType: string]: ReferenceComponent } = {
  talent: TalentReference,
  cap: CapacityReference,
  perk: Index,
  action: ActionReference,
  onus: OnusReference,
  bon: BonusReference,
  maneuver: ManeuverReference,
  aux: AuxiliaryReference,
  time: TimeReference,
  base: BaseTestReference,
  vit: VitalityReference,
  power: PowerSourceReference,
  dice: DiceReference,
};

interface ParseReferencesProps {
  parseable: string;
}

export const ParseReferences = (props: ParseReferencesProps) => {
  const { parseable } = props;

  const groups = [];

  let remaining = parseable;
  let startIndex = remaining.indexOf('{{');
  while (startIndex >= 0) {
    const before = remaining.substring(0, startIndex);
    const endIndex = startIndex + remaining.substring(startIndex).indexOf('}}');
    const group = remaining.substring(startIndex + 2, endIndex);
    remaining = remaining.substring(endIndex + 2);

    const [entity, name] = group.split(':');
    const Component: ReferenceComponent = referenceTypes[entity];

    groups.push(before);
    groups.push(Component ? <Component name={name} /> : <UnknownReference group={group} />);
    startIndex = remaining.indexOf('{{');
  }
  if (remaining) groups.push(remaining);

  return <>{groups}</>;
};
