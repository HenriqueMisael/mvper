import React from 'react';
import { Button, Classes } from '@blueprintjs/core';
import { actions, useDispatch } from '../../../store';
import { SorceryID } from '../../../common/model/sorcery';
import classNames from 'classnames';
import { GrimMorID } from '../grim-mor/slice/model';

interface Props {
  grimMorID: GrimMorID;
  sorceryID: SorceryID;
}

const IncrementSorceryExperienceButton = (props: Props) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(actions.grimMor.incrementSorceryExperience(props));
  };

  return (
    <Button
      className={classNames('sorcery-experience-button', 'add', Classes.SMALL)}
      onClick={handleClick}
      icon="add"
    />
  );
};

export default IncrementSorceryExperienceButton;
