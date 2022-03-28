import React, { useEffect, useRef } from 'react';
import { Menu, MenuItem } from '@blueprintjs/core';
import { t } from 'i18next';

import { actions, selectors, useDispatch, useSelector } from '../../../store';
import { Sorcery } from '../../../common/model/sorcery';
import AddGrimMorInput from '../grim-mor/grim-mor-list/add-grim-mor-input';

interface Props {
  sorcery: Sorcery;
}

const GrimMorSelectionMenu = ({ sorcery }: Props) => {
  const createdGrimMorNameRef = useRef<string>('');
  const grimMores = useSelector(selectors.grimMor.getGrimMores);

  const dispatch = useDispatch();
  useEffect(() => {
    if (createdGrimMorNameRef.current === '') return;
    const createdIndex = grimMores
      .map((grimMor) => grimMor.name)
      .lastIndexOf(createdGrimMorNameRef.current);
    const createdGrimMor = grimMores[createdIndex];
    dispatch(
      actions.grimMor.addSorcery({ grimMorID: createdGrimMor.id, sorcery: sorcery.toJSON() }),
    );
    createdGrimMorNameRef.current = '';
  }, [grimMores]);

  return (
    <Menu>
      {grimMores.map((grimMor) => {
        const handleClick = () => {
          dispatch(
            actions.grimMor.addSorcery({ grimMorID: grimMor.id, sorcery: sorcery.toJSON() }),
          );
        };

        const disabled = grimMor.sorceries.some(
          (grimMorSorcery) => grimMorSorcery.id === sorcery.id,
        );
        const title = disabled
          ? t('sorcery-list:grimMor.alreadyAdded', {
              sorceryName: sorcery.name,
              grimMorName: grimMor.name,
            })
          : '';
        const label = disabled ? t('common:added') : '';

        return (
          <MenuItem
            key={grimMor.id}
            disabled={disabled}
            label={label}
            title={title}
            text={grimMor.name}
            onClick={handleClick}
          />
        );
      })}
      <AddGrimMorInput
        onCreate={(createdGrimMorName) => (createdGrimMorNameRef.current = createdGrimMorName)}
      />
    </Menu>
  );
};

export default GrimMorSelectionMenu;
