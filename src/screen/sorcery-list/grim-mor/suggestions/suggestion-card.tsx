import React from 'react';
import { Button, Classes, H1, H2 } from '@blueprintjs/core';
import classNames from 'classnames';
import { t } from 'i18next';

import { PureEntity } from '../../../../common/model/sorcery';
import { actions, selectors, useDispatch, useSelector } from '../../../../store';
import { useSelectedGrimMorID } from '../../hooks';

import './suggestion-card.scss';

interface Props {
  entity: PureEntity;
}

const SuggestionCard = ({ entity }: Props) => {
  const [grimMorID] = useSelectedGrimMorID();
  const sorceries = useSelector(selectors.core.getSorceries).filter((sorcery) => {
    if (sorcery.entity === 'Livre' && sorcery.level === 0) return true;
    return sorcery.entity === entity && sorcery.level <= 1;
  });

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(actions.grimMor.addSorceries({ grimMorID, sorceries }));
  };

  return (
    <Button
      className={classNames(Classes.OUTLINED, 'suggestion-card-root')}
      onClick={handleClick}
    >
      <H1>{entity}</H1>
      <H2>
        <span className={classNames('entitySphere', `entity-${entity}`)} />
      </H2>
      <p>{t('sorcery-list:grimMor.template.description', { entity })}</p>
      <div className="suggestion-card-sorcery-list">
        {sorceries.map((sorcery) => {
          const key = sorcery.id;
          return (
            <p key={key} className="suggestion-card-sorcery">
              <span className={classNames('entitySphere', `entity-${sorcery.entity}`)} />
              &nbsp;
              {sorcery.name}
            </p>
          );
        })}
      </div>
    </Button>
  );
};

export default SuggestionCard;
