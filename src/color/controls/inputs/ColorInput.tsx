/**
 * Color picker input (input type=color) for interacting with the color tool app
 */

import React, { useContext, useRef, useEffect, useState } from 'react';

import { ColorToolContext } from '~/ColorToolContext';
import { updateHex } from '~/color/actions';
import { isValidHex } from '~/color-check-util';

export const ColorInput = () => {
  const { hex, dispatch } = useContext(ColorToolContext);
  const input = useRef(null);

  // Only show the color input if it's supported by the browser
  const [show, setShow] = useState(true);
  useEffect(() => {
    input.current.value = '!';
    if ('!' === input.current.value) {
      setShow(false);
    }
  }, []);

  const onChange = ({ target: { value } }) => {
    dispatch(updateHex(value));
  };

  return show ? (
    <section aria-label="Color Picker" className="color-picker-container">
      <label>
        Color Picker:
        <input
          style={{ marginLeft: 15 }}
          type="color"
          ref={input}
          value={hex && isValidHex(hex) ? hex : null}
          onChange={onChange}
        />
      </label>
    </section>
  ) : null;
};
