import { createSelector } from '@reduxjs/toolkit';
import * as core from '../../../store/core/selectors';
import { PerkSearchOption, screensSearchOptions, TalentSearchOption } from './duck';

export const getOptions = createSelector([core.getPerks, core.getTalents], (perks, talents) => {
  const perkOptions = perks.map((perk) => new PerkSearchOption(perk));
  const talentsOptions = talents.map((talent) => new TalentSearchOption(talent));
  return [...screensSearchOptions, ...perkOptions, ...talentsOptions];
});
