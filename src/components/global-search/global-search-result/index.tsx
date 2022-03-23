import React from 'react';

import { MenuItem } from '@blueprintjs/core';

import { GlobalSearchOption } from '../slice/duck';

interface GlobalSearchResultProps {
  result: GlobalSearchOption;
}
const GlobalSearchResult = ({ result }: GlobalSearchResultProps) => {
  const { text } = result;
  return <MenuItem text={text} />;
};

export default GlobalSearchResult;
