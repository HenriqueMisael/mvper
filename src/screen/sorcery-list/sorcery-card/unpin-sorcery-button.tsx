import React from 'react';
import classNames from 'classnames';
import { Button, Classes } from '@blueprintjs/core';

import { actions, useDispatch } from '../../../store';
import { Sorcery } from '../../../common/model/sorcery';
import { useSelectedGrimMor } from '../hooks';

interface Props {
  sorcery: Sorcery;
}

const UnpinSorceryButton = ({ sorcery }: Props) => {
  const [grimMor] = useSelectedGrimMor();
  const handleClick = () => {
    if (grimMor == null) return;
    dispatch(actions.grimMor.removeSorcery({ grimMorID: grimMor.id, sorceryID: sorcery.id }));
  };
  const dispatch = useDispatch();

  return (
    <Button
      className={classNames(Classes.MINIMAL, Classes.SMALL)}
      icon="unpin"
      onClick={handleClick}
    />
  );
};

export default UnpinSorceryButton;
