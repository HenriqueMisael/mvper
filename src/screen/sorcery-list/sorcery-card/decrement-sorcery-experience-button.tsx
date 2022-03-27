import React from 'react';
import { Button, Classes } from '@blueprintjs/core';
import classNames from 'classnames';

import { actions, useDispatch } from '../../../store';
import { SorceryID } from '../../../common/model/sorcery';
import { GrimMorID } from '../grim-mor/slice/model';

interface Props {
  grimMorID: GrimMorID;
  sorceryID: SorceryID;
}

const DecrementSorceryExperienceButton = (props: Props) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(actions.grimMor.decrementSorceryExperience(props));
  };

  return (
    <Button
      className={classNames('sorcery-experience-button', 'sub', Classes.SMALL)}
      onClick={handleClick}
      icon="minus"
    />
  );
};

export default DecrementSorceryExperienceButton;
