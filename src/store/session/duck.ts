import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Language } from '../../i18n/config';

type Theme = 'light' | 'dark';
type SessionState = {
  theme: Theme;
  language: Language;
};

const initialState: SessionState = {
  theme: 'dark',
  language: 'pt_BR',
};

export default createSlice({
  name: 'session',
  initialState,
  reducers: {
    setTheme(state, { payload }: PayloadAction<Theme>) {
      state.theme = payload;
    },
    setLanguage(state, { payload }: PayloadAction<Language>) {
      state.language = payload;
    },
  },
});
