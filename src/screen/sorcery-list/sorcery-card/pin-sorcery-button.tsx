import React, { useState } from 'react';
import classNames from 'classnames';
import { Button, Classes } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';

import { Sorcery } from '../../../common/model/sorcery';

import GrimMorSelectionMenu from './grim-mor-selection-menu';

interface Props {
  sorcery: Sorcery;
}

const PinSorceryButton = ({ sorcery }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Popover2
      onInteraction={(open) => {
        setIsOpen(open);
      }}
      isOpen={isOpen}
      renderTarget={({ ref }) => (
        <span ref={ref}>
          <Button
            className={classNames(Classes.MINIMAL, Classes.SMALL)}
            icon="pin"
            onClick={handleClick}
          />
        </span>
      )}
      content={<GrimMorSelectionMenu sorcery={sorcery} />}
    />
  );
};

export default PinSorceryButton;
