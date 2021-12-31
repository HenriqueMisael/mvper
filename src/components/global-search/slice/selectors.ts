import { createSelector } from '@reduxjs/toolkit';
import * as core from '../../../store/core/selectors';
import {
  CapacitySearchOption,
  PerkSearchOption,
  screensSearchOptions,
  TalentSearchOption,
} from './duck';

export const getOptions = createSelector(
  [core.getPerks, core.getTalents, core.getCapacities],
  (perks, talents, capacities) => {
    const perkOptions = perks.map((perk) => new PerkSearchOption(perk));
    const talentsOptions = talents.map((talent) => new TalentSearchOption(talent));
    const capacitiesOptions = capacities.map((capacity) => new CapacitySearchOption(capacity));
    return [...screensSearchOptions, ...capacitiesOptions, ...perkOptions, ...talentsOptions];
  },
);
