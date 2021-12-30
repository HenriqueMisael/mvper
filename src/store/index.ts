import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from 'react-redux';
import session from './session/duck';
import * as sessionSelectors from './session/selectors';
import core from './core/duck';
import * as coreSelectors from './core/selectors';
import * as globalSearchSelectors from '../components/global-search/slice/selectors';

const store = configureStore({
  reducer: {
    core: core.reducer,
    session: session.reducer,
  },
});

export const actions = {
  core: core.actions,
  session: session.actions,
};

export const selectors = {
  core: coreSelectors,
  session: sessionSelectors,
  globalSearch: globalSearchSelectors,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useDispatchBase<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase;

export default store;
