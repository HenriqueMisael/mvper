import React from 'react';
import { Button, Classes } from '@blueprintjs/core';

import { actions, useDispatch } from '../../../../store';
import { useSelectedGrimMor } from '../../hooks';
import { GrimMor } from '../slice/model';

interface Props {
  grimMor: GrimMor;
}

const GrimMorButton = ({ grimMor }: Props) => {
  const [selectedGrimMor, setSelectedGrimMor] = useSelectedGrimMor();
  const active = selectedGrimMor?.id === grimMor.id ?? false;

  const handleClick = () => {
    setSelectedGrimMor(active ? null : grimMor);
  };
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(actions.grimMor.removeGrimMor(grimMor.id));
  };

  return (
    <div className="grim-mor-item">
      <Button className={Classes.OUTLINED} active={active} onClick={handleClick}>
        {grimMor.name}
      </Button>
      <Button className={Classes.MINIMAL} icon="trash" onClick={handleDelete} />
    </div>
  );
};

export default GrimMorButton;
