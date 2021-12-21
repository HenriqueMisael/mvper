import React from 'react';
import { Classes, Switch } from '@blueprintjs/core';
import { t } from 'i18next';

import { actions, selectors, useDispatch, useSelector } from '../../store';

const ThemeToggle = () => {
  const theme = useSelector(selectors.session.getTheme);
  const dispatch = useDispatch();
  return (
    <Switch
      className={Classes.INTENT_WARNING}
      checked={theme === 'light'}
      innerLabel={t(`common:theme.dark`)}
      innerLabelChecked={t(`common:theme.light`)}
      onChange={({ currentTarget }) =>
        dispatch(actions.session.setTheme(!currentTarget.checked ? 'dark' : 'light'))
      }
    />
  );
};

export default ThemeToggle;
