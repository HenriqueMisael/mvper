import React from 'react';
import { Link } from 'react-router-dom';
import { Button, MenuItemProps } from '@blueprintjs/core';

const AnchorMenuItem = (props: MenuItemProps) => {
  const { href = '#', ...rest } = props;
  return (
    <Link to={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Button minimal fill {...rest} />
    </Link>
  );
};

export default AnchorMenuItem;
