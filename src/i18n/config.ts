import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt_BR from './pt-BR';

export const resources = {
  pt_BR,
};
i18n.use(initReactI18next).init({
  lng: 'pt_BR',
  ns: ['common', 'perks', 'talents'],
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  returnObjects: true,
  resources,
});

export type Language = keyof typeof resources;
