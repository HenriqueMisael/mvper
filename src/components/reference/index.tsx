import { ReactElement } from 'react';

import TalentReference from './talent-reference';
import UnknownReference from './unknown-reference';
import CapacityReference from './capacity-reference';

export interface ReferenceComponentProps {
  name: string;
}
type ReferenceComponent = (props: ReferenceComponentProps) => ReactElement;
const referenceTypes: { [referenceType: string]: ReferenceComponent } = {
  talent: TalentReference,
  cap: CapacityReference,
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
    const Component: ReferenceComponent = referenceTypes[entity] ?? UnknownReference;

    groups.push(before);
    groups.push(<Component name={name} />);
    startIndex = remaining.indexOf('{{');
  }

  return <>{groups}</>;
};
