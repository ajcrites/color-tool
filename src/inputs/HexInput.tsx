import React, { useContext, useRef } from 'react';
import parse from 'parse-color';

import { ColorToolContext } from '../ColorToolContext';

export const HexInput = () => {
  const { hex, dispatch } = useContext(ColorToolContext);
  const input = useRef(null);

  const onChange = ({ target: { value: payload } }) => {
    dispatch({ type: 'hex', payload });
  };

  const onFocus = () => {
    if (!hex) {
      dispatch({ type: 'hex', payload: '#' });
    }
  };

  return (
    <label>
      Hex:{' '}
      <input
        type="text"
        ref={input}
        value={hex}
        onChange={onChange}
        onFocus={onFocus}
        style={{
          backgroundColor: parse(hex).hex || !hex || hex === '#' ? '' : '#ffb8c2',
        }}
      />
    </label>
  );
};
