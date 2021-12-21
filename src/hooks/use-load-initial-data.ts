import { useDispatch } from '../store';
import { fetchInitialData } from '../store/core/duck';
import { useEffect } from 'react';

export function useLoadInitialData() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInitialData());
  }, []);
}
