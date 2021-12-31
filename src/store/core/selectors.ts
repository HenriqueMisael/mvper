import { createSelector } from '@reduxjs/toolkit';
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

export const getCapacityByCapacityID = createSelector([getRoot], (state) => {
  return state.capacity;
});

export const getPerks = createSelector([getPerkByPerkID], (perkByPerkID) => {
  return Object.values(perkByPerkID);
});

export const getTalents = createSelector([getTalentByTalentID], (talentByTalentID) => {
  return Object.values(talentByTalentID);
});

export const getCapacities = createSelector(
  [getCapacityByCapacityID],
  (capacityByCapacityID) => {
    return Object.values(capacityByCapacityID);
  },
);
