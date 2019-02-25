import React, { useContext, useRef } from 'react';
import parse from 'parse-color';

import { ColorToolContext } from '~/ColorToolContext';
import { updateHex } from '~/color/actions';
import { CopyToClipboardButton } from './CopyToClipboardButton';

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

  return (
    <label>
      <span className="input-label">Hex:</span>
      <input
        className="color-input"
        type="text"
        ref={input}
        value={hex}
        onChange={onChange}
        onFocus={onFocus}
        style={{
          width: 230,
          backgroundColor: parse(hex).hex || !hex || hex === '#' ? '' : '#ffb8c2',
        }}
      />
      <CopyToClipboardButton value={hex} />
    </label>
  );
};
