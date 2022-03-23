import { useEffect } from 'react';

import { selectors, useDispatch, useStore } from '../store';
import { fetchInitialData } from '../store/core/duck';
import {
  loadGrimMorFromLocalStorage,
  persistGrimMorToLocalStorage,
} from '../screen/sorcery-list/grim-mor/slice/duck';

export function useLoadInitialData() {
  const dispatch = useDispatch();
  const store = useStore();
  useEffect(() => {
    dispatch(fetchInitialData());
    dispatch(loadGrimMorFromLocalStorage());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const grimMores = selectors.grimMor.getGrimMores(store.getState());
      dispatch(persistGrimMorToLocalStorage(grimMores));
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);
}
