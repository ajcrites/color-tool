import React, { useContext } from 'react';

import { ColorToolContext } from '~/ColorToolContext';
import { updateMulti } from '~/color/actions';

export interface HslaModifierProps {
  label: string;
  hslaIndex: 1 | 2 | 3;
  amount: number;
}

/**
 * Button that changes the hsla index value by a specified amount
 */
export const HslaModifier = ({ label, hslaIndex, amount }) => {
  const { hsla, dispatch } = useContext(ColorToolContext);

  const onClick = () => {
    hsla[hslaIndex] = hsla[hslaIndex] + amount;
    dispatch(updateMulti('hsla', hsla));
  };

  return <button onClick={onClick}>{label}</button>;
};