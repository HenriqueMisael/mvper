import React from 'react';
import { Select } from '@blueprintjs/select';
import { actions, selectors, useDispatch, useSelector } from '../../store';
import { Language } from '../../i18n/config';
import { t } from 'i18next';
import { Button, MenuItem } from '@blueprintjs/core';

const LanguageSelect = Select.ofType<Language>();

const LanguageSelector = () => {
  const language = useSelector((state) => {
    const key = selectors.session.getLanguage(state);
    return t(`common:language.${key}`);
  });
  const dispatch = useDispatch();

  return (
    <LanguageSelect
      filterable={false}
      items={['pt_BR']}
      itemRenderer={(langKey, { handleClick }) => (
        <MenuItem key={langKey} text={t(`common:language.${langKey}`)} onClick={handleClick} />
      )}
      onItemSelect={(language) => dispatch(actions.session.setLanguage(language))}
    >
      <Button text={language} />
    </LanguageSelect>
  );
};

export default LanguageSelector;
