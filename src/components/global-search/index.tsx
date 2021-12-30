import { MenuItem, useHotkeys } from '@blueprintjs/core';
import React, { useMemo, useRef } from 'react';
import { HotkeyConfig } from '@blueprintjs/core/src/hooks/hotkeys/hotkeyConfig';
import { Suggest } from '@blueprintjs/select';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';

import { GlobalSearchOption } from './slice/duck';
import './index.scss';
import { selectors, useSelector } from '../../store';

const GlobalSearchSuggest = Suggest.ofType<GlobalSearchOption>();

const GlobalSearch = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const hotkeys = useMemo<HotkeyConfig[]>(
    () => [
      {
        combo: 'ctrl+k',
        global: true,
        label: 'Global search',
        preventDefault: true,
        onKeyDown: () => {
          if (!inputRef.current) return;
          inputRef.current.focus();
        },
      },
    ],
    [],
  );
  const { handleKeyDown, handleKeyUp } = useHotkeys(hotkeys);
  const options = useSelector(selectors.globalSearch.getOptions);

  const navigate = useNavigate();

  return (
    <div className="global-search-root" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
      <GlobalSearchSuggest
        inputProps={{
          inputRef,
          type: 'search',
          leftIcon: 'search',
          placeholder: t('common:search'),
        }}
        itemPredicate={(query, item) => item.isVisible(query)}
        inputValueRenderer={(item) => item.text}
        itemRenderer={(globalSearchOption, { handleClick, modifiers, query }) => {
          if (!modifiers.matchesPredicate) {
            return null;
          }
          const { text, group } = globalSearchOption;
          return (
            <MenuItem
              active={modifiers.active}
              disabled={modifiers.disabled}
              onClick={handleClick}
              text={text}
              label={group}
            />
          );
        }}
        items={options}
        onItemSelect={(item) => navigate(item.route)}
        popoverProps={{ minimal: true }}
        noResults={<MenuItem disabled={true} text="No results." />}
        closeOnSelect
        resetOnClose
        resetOnSelect
        resetOnQuery
        fill
      />
    </div>
  );
};

export default GlobalSearch;
