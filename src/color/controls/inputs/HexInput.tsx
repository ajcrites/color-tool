import React, { useContext, useRef } from 'react';
import parse from 'parse-color';

import { ColorToolContext } from '~/ColorToolContext';
import { updateHex } from '~/color/actions';

export const HexInput = () => {
  const { hex, dispatch } = useContext(ColorToolContext);
  const input = useRef(null);

  const onChange = ({ target: { value } }) => {
    dispatch(updateHex(value));
  };

  const onFocus = () => {
    if (!hex) {
      dispatch(updateHex('#'));
    }
  };

  const copyToClipboard = () => {
    (navigator as any).clipboard.writeText(hex);
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
          backgroundColor:
            parse(hex).hex || !hex || hex === '#' ? '' : '#ffb8c2',
        }}
      />
      <button
        onClick={copyToClipboard}
      ><img width="16" height="16" src="copy-to-clipboard.svg" /></button>
    </label>
  );
};
