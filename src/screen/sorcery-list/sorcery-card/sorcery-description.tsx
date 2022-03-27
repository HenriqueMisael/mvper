import React from 'react';
import { Sorcery } from '../../../common/model/sorcery';

interface Props {
  sorcery: Sorcery;
}

const SorceryDescription = ({ sorcery }: Props) => {
  return <p className="sorcery-description">{sorcery.description}</p>;
};

export default SorceryDescription;
