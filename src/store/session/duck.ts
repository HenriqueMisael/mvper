import { createSlice } from '@reduxjs/toolkit'
import { Language } from '../../i18n/config'

type SessionState = {
  theme: 'light' | 'dark'
  language: Language
}

const initialState: SessionState = {
  theme: 'dark',
  language: 'pt_BR',
}

export default createSlice({
  name: 'session',
  initialState,
  reducers: {
    setTheme(state, { payload }) {
      state.theme = payload
    },
    setLanguage(state, { payload }) {
      state.language = payload
    },
  },
})
