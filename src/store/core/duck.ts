import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { importPerks, Perk, PerkID } from '../../common/model/perk';
import { importTalents, Talent, TalentID } from '../../common/model/talent';

interface CoreState {
  perk: { [k: PerkID]: Perk };
  talent: { [k: TalentID]: Talent };
  fetching: 'idle' | 'pending';
  error: string;
}

const initialState: CoreState = {
  perk: {},
  talent: {},
  fetching: 'idle',
  error: '',
};

export const fetchInitialData = createAsyncThunk('core/fetchInitialData', async () => {
  const perksJson = await importPerks();
  const talentsJson = await importTalents();
  return { perksJson, talentsJson };
});

let fetchInitialDataFulfilled = (
  state: CoreState,
  action: PayloadAction<{ perksJson: Perk[]; talentsJson: Talent[] }>,
) => {
  action.payload.perksJson.forEach((perk) => {
    state.perk[perk.id] = perk;
  });
  action.payload.talentsJson.forEach((talent) => {
    state.talent[talent.id] = talent;
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
      .addCase(fetchInitialData.pending, fetchInitialDataPending)
      .addCase(fetchInitialData.rejected, function (state, action) {
        state.fetching = 'idle';
        state.error = 'error';
      }),
});
