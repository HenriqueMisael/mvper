import { configureStore } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from 'react-redux'
import session from './session/duck'
import * as sessionSelectors from './session/selectors'

const store = configureStore({
  reducer: {
    session: session.reducer,
  },
})

export const actions = {
  session: session.actions,
}

export const selectors = {
  session: sessionSelectors,
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useDispatch = () => useDispatchBase<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase

export default store
