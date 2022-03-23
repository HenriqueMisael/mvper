import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AbstractSorcery, SorceryID, SorceryJSON } from '../../../../common/model/sorcery';

import { GrimMor, GrimMorID, GrimMorJSON } from './model';

type GrimMorMap = { [k: GrimMorID]: GrimMorJSON };

interface GrimMorState {
  grimMor: GrimMorMap;
  deleted: GrimMorMap;
  nextID: GrimMorID;
  fetching: 'idle' | 'pending';
  saving: 'idle' | 'pending';
  error: string;
}

const initialState: GrimMorState = Object.freeze({
  grimMor: {},
  deleted: {},
  fetching: 'idle',
  saving: 'idle',
  nextID: '',
  error: '',
});

export const loadGrimMorFromLocalStorage = createAsyncThunk(
  'grimMor/loadGrimMorFromLocalStorage',
  async () => {
    const previouslySaved = localStorage.getItem('grimmor');
    if (previouslySaved == null) return [];
    return JSON.parse(previouslySaved) as GrimMorJSON[];
  },
);

export const persistGrimMorToLocalStorage = createAsyncThunk(
  'grimMor/persistGrimMorToLocalStorage',
  async (grimMores: GrimMor[]) => {
    const previouslySaved = localStorage.getItem('grimmor');
    if (previouslySaved != null) {
      const timestamp = Date.now();
      if (timestamp % 300000 === 0) {
        localStorage.setItem('grimmor' + timestamp, previouslySaved);
      }
    }

    const json = JSON.stringify(grimMores.map((grimMor) => grimMor.toJSON()));
    localStorage.setItem('grimmor', json);
  },
);

export default createSlice({
  name: 'grimMor',
  initialState,
  reducers: {
    insertGrimMor(state, action: PayloadAction<string>) {
      const nextID = Number(state.nextID) + 1;
      state.nextID = (nextID + 1).toString();

      const newGrimMor = new GrimMor(nextID.toString(), action.payload, []).toJSON();
      state.grimMor[newGrimMor.id] = newGrimMor;
    },
    updateGrimMor(state, action: PayloadAction<GrimMor>) {
      const { id } = action.payload;
      state.grimMor[id] = action.payload;
    },
    removeGrimMor(state, action: PayloadAction<GrimMorID>) {
      const id = action.payload;
      state.deleted[id] = state.grimMor[id];
      delete state.grimMor[id];
    },
    addSorcery(state, action: PayloadAction<{ grimMorID: GrimMorID; sorcery: SorceryJSON }>) {
      state.grimMor[action.payload.grimMorID].sorceries.push(action.payload.sorcery);
    },
    removeSorcery(
      state,
      action: PayloadAction<{ grimMorID: GrimMorID; sorceryID: SorceryID }>,
    ) {
      const sorceries = state.grimMor[action.payload.grimMorID].sorceries;
      state.grimMor[action.payload.grimMorID].sorceries = sorceries.filter(
        (sorcery) => sorcery.id !== action.payload.sorceryID,
      );
    },
    incrementSorceryExperience(
      state,
      action: PayloadAction<{ grimMorID: GrimMorID; sorceryID: SorceryID }>,
    ) {
      const { sorceries } = state.grimMor[action.payload.grimMorID];
      const index = sorceries.findIndex((sorcery) => sorcery.id === action.payload.sorceryID);
      const sorcery = AbstractSorcery.fromJSON(sorceries[index]);
      sorcery.incrementExperience();

      state.grimMor[action.payload.grimMorID].sorceries[index] = sorcery.toJSON();
    },
    decrementSorceryExperience(
      state,
      action: PayloadAction<{ grimMorID: GrimMorID; sorceryID: SorceryID }>,
    ) {
      const { sorceries } = state.grimMor[action.payload.grimMorID];
      const index = sorceries.findIndex((sorcery) => sorcery.id === action.payload.sorceryID);
      const sorcery = AbstractSorcery.fromJSON(sorceries[index]);
      sorcery.decrementExperience();

      state.grimMor[action.payload.grimMorID].sorceries[index] = sorcery.toJSON();
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(loadGrimMorFromLocalStorage.fulfilled, (state, action) => {
        let nextID = 1;
        state.grimMor = Object.fromEntries(
          action.payload.map((grimMor) => {
            if (Number(grimMor.id) > nextID) nextID = Number(grimMor.id) + 1;
            return [grimMor.id, grimMor];
          }),
        );
        state.nextID = nextID.toString();
      })
      .addCase(loadGrimMorFromLocalStorage.pending, (state) => {
        state.fetching = 'pending';
      })
      .addCase(loadGrimMorFromLocalStorage.rejected, (state) => {
        state.fetching = 'idle';
        state.error = 'error while fetching';
      })
      .addCase(persistGrimMorToLocalStorage.fulfilled, (state) => {
        state.saving = 'idle';
      })
      .addCase(persistGrimMorToLocalStorage.pending, (state) => {
        state.saving = 'pending';
      })
      .addCase(persistGrimMorToLocalStorage.rejected, (state) => {
        state.saving = 'idle';
        state.error = 'error while saving';
      }),
});
