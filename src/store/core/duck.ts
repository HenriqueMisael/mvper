import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Capacity, CapacityID, importCapacities } from '../../common/model/capacity';
import { importPerks, Perk, PerkID } from '../../common/model/perk';
import { importTalents, Talent, TalentID } from '../../common/model/talent';

interface CoreState {
  perk: { [k: PerkID]: Perk };
  talent: { [k: TalentID]: Talent };
  capacity: { [k: CapacityID]: Capacity };
  fetching: 'idle' | 'pending';
  error: string;
}

const initialState: CoreState = {
  perk: {},
  talent: {},
  capacity: {},
  fetching: 'idle',
  error: '',
};

export const fetchInitialData = createAsyncThunk('core/fetchInitialData', async () => {
  const perksJson = await importPerks();
  const talentsJson = await importTalents();
  const capacitiesJson = await importCapacities();
  return { perksJson, talentsJson, capacitiesJson };
});

let fetchInitialDataFulfilled = (
  state: CoreState,
  action: PayloadAction<{
    perksJson: Perk[];
    talentsJson: Talent[];
    capacitiesJson: Capacity[];
  }>,
) => {
  action.payload.perksJson.forEach((perk) => {
    state.perk[perk.id] = perk;
  });
  action.payload.talentsJson.forEach((talent) => {
    state.talent[talent.id] = talent;
  });
  action.payload.capacitiesJson.forEach((capacity) => {
    state.capacity[capacity.id] = capacity;
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
      .addCase(fetchInitialData.rejected, function (state) {
        state.fetching = 'idle';
        state.error = 'error';
      }),
});
