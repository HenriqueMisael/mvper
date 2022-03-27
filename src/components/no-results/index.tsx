import React from 'react';

interface Props {
  label: string;
}

const NoResults = ({ label }: Props) => {
  return (
    <div style={{ margin: '1rem', textAlign: 'center', fontStyle: 'italic' }}>{label}</div>
  );
};

export default NoResults;
