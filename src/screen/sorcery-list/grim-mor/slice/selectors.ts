import { RootState } from '../../../../store';
import { createSelector } from '@reduxjs/toolkit';
import { GrimMor } from './model';

const getRoot = (state: RootState) => state.grimMor;

export const getIsFetching = createSelector([getRoot], (state) => {
  return state.fetching === 'pending';
});

export const getGrimMorByGrimMorID = createSelector([getRoot], (state) => {
  return Object.fromEntries(
    Object.entries(state.grimMor).map(([id, json]) => [id, GrimMor.fromJSON(json)]),
  );
});

export const getGrimMores = createSelector([getGrimMorByGrimMorID], (state) => {
  return Object.values(state);
});
