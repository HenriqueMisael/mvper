import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Perk, PerkID } from '../../common/model/perk';

interface CoreState {
  perk: { [k: PerkID]: Perk };
  fetching: 'idle' | 'pending';
  error: string;
}

const initialState: CoreState = {
  perk: {},
  fetching: 'idle',
  error: '',
};

export const fetchInitialData = createAsyncThunk('core/fetchInitialData', async () => {
  let perksJson = await import('../../data/pt-BR/perks.json');
  return perksJson.default;
});

let fetchInitialDataFulfilled = (state: CoreState, action: PayloadAction<Perk[]>) => {
  action.payload.forEach((perk, i) => {
    const id = `${i + 1}`;
    const { name, detail, levels, condition } = perk;
    state.perk[id] = {
      id,
      name,
      detail,
      levels,
      condition,
    };
  });
  state.fetching = 'idle';
};
let fetchInitialDataPending = (state: CoreState) => {
  state.fetching = 'pending';
};
export default createSlice({
  name: 'core',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchInitialData.fulfilled, fetchInitialDataFulfilled)
      .addCase(fetchInitialData.pending, fetchInitialDataPending),
});
