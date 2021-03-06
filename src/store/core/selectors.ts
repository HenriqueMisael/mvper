import { createSelector } from '@reduxjs/toolkit';

import { AbstractSorcery } from '../../common/model/sorcery';
import { RootState } from '../index';

const getRoot = (state: RootState) => state.core;

export const getIsFetching = createSelector([getRoot], (state) => {
  return state.fetching === 'pending';
});

export const getPerkByPerkID = createSelector([getRoot], (state) => {
  return state.perk;
});

export const getTalentByTalentID = createSelector([getRoot], (state) => {
  return state.talent;
});

export const getSorceryBySorceryID = createSelector([getRoot], (state) => {
  return Object.fromEntries(
    Object.entries(state.sorcery).map(([id, json]) => [id, AbstractSorcery.fromJSON(json)]),
  );
});

export const getCapacityByCapacityID = createSelector([getRoot], (state) => {
  return state.capacity;
});

export const getPerks = createSelector([getPerkByPerkID], (perkByPerkID) => {
  return Object.values(perkByPerkID);
});

export const getTalents = createSelector([getTalentByTalentID], (talentByTalentID) => {
  return Object.values(talentByTalentID);
});

export const getSorceries = createSelector([getSorceryBySorceryID], (sorceryBySorceryID) => {
  return Object.values(sorceryBySorceryID);
});

export const getCapacities = createSelector(
  [getCapacityByCapacityID],
  (capacityByCapacityID) => {
    return Object.values(capacityByCapacityID);
  },
);
