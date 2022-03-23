import { t } from 'i18next';
import { Perk } from '../../../common/model/perk';
import { Capacity } from '../../../common/model/capacity';

export abstract class GlobalSearchOption {
  public readonly tags: string[];

  protected constructor(
    public readonly group: string,
    public readonly text: string,
    public readonly route: string,
  ) {
    this.tags = [group, text, route];
  }

  isVisible(query: string): boolean {
    const regex = new RegExp(query.split('').join('.*'), 'gi');
    return this.tags.some((tag) => regex.test(tag));
  }
}

class ScreenSearchOption extends GlobalSearchOption {
  constructor(public readonly namespace: string, public readonly route: string) {
    super(t('common:screens'), t(`${namespace}:title`), route);
  }
}

export class PerkSearchOption extends GlobalSearchOption {
  constructor(perk: Perk) {
    super(t('perk-list:title'), perk.name, `/perk/${perk.id}`);
  }
}

// export class TalentSearchOption extends GlobalSearchOption {
//   constructor(talent: Talent) {
//     super(t('talent-list:title'), talent.name, `/talent#${talent.id}`);
//   }
// }
//
// export class SorcerySearchOption extends GlobalSearchOption {
//   constructor(sorcery: Sorcery) {
//     super(t('sorcery-list:title'), sorcery.name, `/sorcery/${sorcery.id}`);
//   }
// }

export class CapacitySearchOption extends GlobalSearchOption {
  constructor(capacity: Capacity) {
    super(t('capacity-list:title'), capacity.name, `/capacity/${capacity.id}`);
  }
}

export const screensSearchOptions = [
  new ScreenSearchOption('perk-list', 'perk'),
  new ScreenSearchOption('talent-list', 'talent'),
  new ScreenSearchOption('sorcery-list', 'sorcery'),
];
