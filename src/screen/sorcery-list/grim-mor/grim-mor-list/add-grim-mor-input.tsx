import React, { ChangeEventHandler, useState } from 'react';
import { InputGroup } from '@blueprintjs/core';
import { t } from 'i18next';
import { actions, useDispatch } from '../../../../store';

interface Props {
  onCreate?: (name: string) => void;
}

const AddGrimMorInput = ({ onCreate }: Props) => {
  const [name, setName] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setName(target.value);
  };

  const dispatch = useDispatch();

  return (
    <InputGroup
      placeholder={t('sorcery-list:grimMor.add')}
      value={name}
      onChange={handleChange}
      onKeyUp={(evt) => {
        switch (evt.code) {
          case 'Enter':
            dispatch(actions.grimMor.insertGrimMor({ name }));
            if (onCreate) onCreate(name);
            setName('');
            break;
        }
      }}
    />
  );
};

export default AddGrimMorInput;
