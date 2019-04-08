/**
 * Input that handles hex color code input (#abcdef)
 */

import React, { useContext } from 'react';

import { ColorToolContext } from '~/ColorToolContext';
import { updateHex } from '~/color/actions';
import { CopyToClipboardButton } from '~/color/controls/CopyToClipboardButton';
import { isValidHex } from '~/color-check-util';

export const HexInput = () => {
  const { hex, dispatch } = useContext(ColorToolContext);

  const onChange = ({ target: { value } }) => {
    dispatch(updateHex(value));
  };

  const onFocus = () => {
    if (!hex) {
      dispatch(updateHex('#'));
    }
  };

  return (
    <section aria-label="Hex" className="color-input-container">
      <label className="color-input-label">
        <span className="input-label-text">Hex:</span>
        <input
          autoCapitalize="none"
          className={'color-input ' + (isValidHex(hex) ? '' : 'invalid')}
          type="text"
          value={hex}
          onChange={onChange}
          onFocus={onFocus}
        />
      </label>
      <CopyToClipboardButton value={hex} />
    </section>
  );
};
