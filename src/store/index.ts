import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
  useStore as useStoreBase,
} from 'react-redux';

import * as globalSearchSelectors from '../components/global-search/slice/selectors';
import grimMor from '../screen/sorcery-list/grim-mor/slice/duck';
import * as grimMorSelectors from '../screen/sorcery-list/grim-mor/slice/selectors';

import session from './session/duck';
import * as sessionSelectors from './session/selectors';
import core from './core/duck';
import * as coreSelectors from './core/selectors';

const store = configureStore({
  reducer: {
    core: core.reducer,
    session: session.reducer,
    grimMor: grimMor.reducer,
  },
});

export const actions = {
  core: core.actions,
  session: session.actions,
  grimMor: grimMor.actions,
};

export const selectors = {
  core: coreSelectors,
  session: sessionSelectors,
  globalSearch: globalSearchSelectors,
  grimMor: grimMorSelectors,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useDispatchBase<AppDispatch>();
export const useStore = useStoreBase;
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase;

export default store;
