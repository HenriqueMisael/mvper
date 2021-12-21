import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

const getRoot = (state: RootState) => state.session;

export const getTheme = createSelector([getRoot], (state) => state.theme);

export const getLanguage = createSelector([getRoot], (state) => state.language);
