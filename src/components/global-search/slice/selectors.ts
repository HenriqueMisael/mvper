import { createSelector } from '@reduxjs/toolkit';

import * as core from '../../../store/core/selectors';

import { CapacitySearchOption, PerkSearchOption, screensSearchOptions } from './duck';

export const getOptions = createSelector(
  [core.getPerks, core.getTalents, core.getSorceries, core.getCapacities],
  (perks, talents, sorceries, capacities) => {
    const perkOptions = perks.map((perk) => new PerkSearchOption(perk));
    /*
     TODO: search and focus on talents
      const talentsOptions = talents.map((talent) => new TalentSearchOption(talent));
    */
    /*
     TODO: search and focus on sorceries
      const sorceriesOptions = sorceries.map((sorcery) => new SorcerySearchOption(sorcery));
    */
    const capacitiesOptions = capacities.map((capacity) => new CapacitySearchOption(capacity));
    return [...screensSearchOptions, ...capacitiesOptions, ...perkOptions];
  },
);
