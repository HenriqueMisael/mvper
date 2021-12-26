import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

const getRoot = (state: RootState) => state.core;

export const getIsFetching = createSelector([getRoot], (state) => {
  return state.fetching === 'pending';
});

export const getPerkByPerkID = createSelector([getRoot], (state) => {
  return state.perk;
});

export const getPerks = createSelector([getRoot], (state) => {
  return Object.values(state.perk);
});
